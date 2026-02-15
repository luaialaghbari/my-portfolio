const fs = require('fs');
const path = require('path');

function stripGlobalBlock(css) {
  const trimmed = css.trimStart();
  if (!trimmed.startsWith(':global')) return css;
  const idx = css.indexOf(':global');
  const brace = css.indexOf('{', idx);
  if (brace === -1) return css;
  // find matching closing brace
  let depth = 0;
  let end = -1;
  for (let i = brace; i < css.length; i++) {
    const ch = css[i];
    if (ch === '{') depth++;
    else if (ch === '}') {
      depth--;
      if (depth === 0) { end = i; break; }
    }
  }
  if (end === -1) return css;
  return css.slice(0, idx) + css.slice(brace + 1, end) + css.slice(end + 1);
}

function wrapSelectorList(sel) {
  let parts = [];
  let buf = '';
  let depth = 0;
  let inString = false;
  let stringChar = '';
  for (let i = 0; i < sel.length; i++) {
    const ch = sel[i];
    const prev = sel[i - 1];
    if (inString) {
      buf += ch;
      if (ch === stringChar && prev !== '\\') inString = false;
      continue;
    }
    if (ch === '"' || ch === "'") {
      inString = true;
      stringChar = ch;
      buf += ch;
      continue;
    }
    if (ch === '(' || ch === '[') { depth++; buf += ch; continue; }
    if (ch === ')' || ch === ']') { depth = Math.max(0, depth-1); buf += ch; continue; }
    if (ch === ',' && depth === 0) { parts.push(buf); parts.push(','); buf=''; continue; }
    buf += ch;
  }
  parts.push(buf);

  let out = '';
  for (const part of parts) {
    if (part === ',') { out += ','; continue; }
    const match = part.match(/^(\s*)(.*?)(\s*)$/s);
    const lead = match ? match[1] : '';
    const core = match ? match[2] : part;
    const trail = match ? match[3] : '';
    if (core.trim().length === 0) { out += part; continue; }
    out += `${lead}:global(${core})${trail}`;
  }
  return out;
}

function wrapSelectors(css) {
  let out = '';
  let i = 0;
  const len = css.length;
  let inComment = false;
  let inString = false;
  let stringChar = '';
  let depth = 0;
  let lastEmit = 0;
  let preludeStart = 0;
  const keyframesDepths = [];

  const isKeyframesPrelude = (prelude) => /@(-[\w]+-)?keyframes\b/i.test(prelude.trim());

  while (i < len) {
    const ch = css[i];
    const next = css[i + 1];

    if (inComment) {
      if (ch === '*' && next === '/') { inComment = false; i += 2; continue; }
      i++; continue;
    }

    if (inString) {
      if (ch === stringChar && css[i - 1] !== '\\') inString = false;
      i++; continue;
    }

    if (ch === '/' && next === '*') { inComment = true; i += 2; continue; }
    if (ch === '"' || ch === "'") { inString = true; stringChar = ch; i++; continue; }

    if (ch === '{') {
      const prelude = css.slice(preludeStart, i);
      const preludeTrim = prelude.trim();
      const isAtRule = preludeTrim.startsWith('@');
      const inKeyframes = keyframesDepths.includes(depth);
      if (!isAtRule && !inKeyframes) {
        const wrapped = wrapSelectorList(prelude);
        out += css.slice(lastEmit, preludeStart) + wrapped;
        lastEmit = i;
      }
      if (isAtRule && isKeyframesPrelude(prelude)) keyframesDepths.push(depth + 1);
      depth++;
      preludeStart = i + 1;
      i++; continue;
    }

    if (ch === '}') {
      depth = Math.max(0, depth - 1);
      if (keyframesDepths.length && keyframesDepths[keyframesDepths.length - 1] === depth + 1) keyframesDepths.pop();
      preludeStart = i + 1;
      i++; continue;
    }

    if (ch === ';' && depth === 0) { preludeStart = i + 1; i++; continue; }

    i++;
  }

  out += css.slice(lastEmit);
  return out;
}

const files = process.argv.slice(2);
if (!files.length) { console.error('Usage: node wrap-global-selectors.js <file...>'); process.exit(1); }

for (const file of files) {
  const input = fs.readFileSync(file, 'utf8');
  const stripped = stripGlobalBlock(input);
  const output = wrapSelectors(stripped);
  fs.writeFileSync(file, output, 'utf8');
  console.log(`Rewrapped ${path.basename(file)}`);
}
