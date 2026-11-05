import fs from 'fs';
import path from 'path';

const iconFilePath = path.resolve('apps/web/lib/koobiq-tool-icons.tsx');
let content = fs.readFileSync(iconFilePath, 'utf8');

const target = '  "cap-table-lite": IconTable24,';
const additions = `  "page-numbers": IconHashtag24,
  "organize-pdf": IconArrowsRotate24,
  "metadata-editor": IconFileTextO24,
  "sign-pdf": IconShieldCheck24,
  "stirling-suite": IconWorkflow24,
  "cron-generator": IconClock24,
  "chmod-calculator": IconKey24,
  "hmac-generator": IconShieldCheck24,
  "docker-run-to-compose": IconCode24,
  "cyberchef": IconWorkflow24,`;

const isCrlf = content.includes('\r\n');
const newline = isCrlf ? '\r\n' : '\n';

if (!content.includes('"page-numbers": IconHashtag24,')) {
  const idx = content.indexOf(target);
  if (idx !== -1) {
    content = content.slice(0, idx + target.length) + newline + additions + content.slice(idx + target.length);
    fs.writeFileSync(iconFilePath, content, 'utf8');
    console.log('Added icon mappings to koobiq-tool-icons.tsx');
  }
}
