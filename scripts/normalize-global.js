const fs = require('fs');
const path = require('path');

function stripGlobalFunctions(css) {
  let out = '';
  let i = 0;
  const len = css.length;
  let inComment = false;
  let inString = false;
  let stringChar = '';

  while (i < len) {
    const ch = css[i];
    const next = css[i + 1];

    if (inComment) {
      out += ch;
      if (ch === '*' && next === '/') {
        out += '/';
        i += 2;
        inComment = false;
        continue;
      }
      i++;
      continue;
    }

    if (inString) {
      out += ch;
      if (ch === stringChar && css[i - 1] !== '\\') {
        inString = false;
      }
      i++;
      continue;
    }

    if (ch === '/' && next === '*') {
      out += ch + next;
      i += 2;
      inComment = true;
      continue;
    }

    if (ch === '"' || ch === "'") {
      out += ch;
      inString = true;
      stringChar = ch;
      i++;
      continue;
    }

    if (css.startsWith(':global(', i)) {
      i += 8; // skip :global(
      let depth = 1;
      let inner = '';
      while (i < len && depth > 0) {
        const c = css[i];
        if (c === '(') {
          depth++;
          inner += c;
        } else if (c === ')') {
          depth--;
          if (depth > 0) inner += c;
        } else {
          inner += c;
        }
        i++;
      }
      out += inner;
      continue;
    }

    out += ch;
    i++;
  }

  return out;
}

function wrapGlobalBlock(css) {
  const trimmed = css.trim();
  if (!trimmed) return css;
  return `:global {\n${css}\n}`;
}

const files = process.argv.slice(2);
if (!files.length) {
  console.error('Usage: node normalize-global.js <file...>');
  process.exit(1);
}

for (const file of files) {
  const input = fs.readFileSync(file, 'utf8');
  const stripped = stripGlobalFunctions(input);
  const output = wrapGlobalBlock(stripped);
  fs.writeFileSync(file, output, 'utf8');
  console.log(`Normalized ${path.basename(file)}`);
}
