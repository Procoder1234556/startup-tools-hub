import fs from 'fs';
import path from 'path';

const toolsFilePath = path.resolve('apps/web/lib/tools.ts');
let content = fs.readFileSync(toolsFilePath, 'utf8');

const pdfAnchor = 'slug: "screenshot-to-pdf",';
const devAnchor = 'slug: "yaml-json-converter",';

const newPdfTools = `  {
    slug: "page-numbers",
    name: "Add Page Numbers",
    description: "Insert customizable page numbers into your PDF. Position, format, font size, and margins. Browser-side.",
    category: "pdf",
    available: true,
    iconColor: "text-rose-600",
  },
  {
    slug: "organize-pdf",
    name: "Organize PDF Pages",
    description: "Visually reorder, rotate, delete, or duplicate PDF pages. 100% private in browser.",
    category: "pdf",
    available: true,
    iconColor: "text-blue-600",
  },
  {
    slug: "metadata-editor",
    name: "PDF Metadata Editor",
    description: "View, edit, or sanitize Title, Author, Subject, Keywords, Creator. Wipe metadata for privacy.",
    category: "pdf",
    available: true,
    iconColor: "text-emerald-600",
  },
  {
    slug: "sign-pdf",
    name: "Sign PDF",
    description: "Electronically sign contracts and documents. Draw, type, or upload signature with date stamp.",
    category: "pdf",
    available: true,
    iconColor: "text-indigo-600",
  },
  {
    slug: "stirling-suite",
    name: "Stirling-PDF Companion",
    description: "Enterprise PDF engine bridge for OCR, PDF/A conversion, document repair, and barcode auto-split via Docker.",
    category: "pdf",
    available: true,
    iconColor: "text-amber-600",
  },`;

const newDevTools = `  {
    slug: "cron-generator",
    name: "Cron Generator & Explainer",
    description: "Build cron schedule expressions with human-readable explanations and next run time projections.",
    category: "dev",
    available: true,
    iconColor: "text-emerald-600",
  },
  {
    slug: "chmod-calculator",
    name: "Linux chmod Calculator",
    description: "Interactive Unix permissions calculator. Convert octal (755, 644, 600) and symbolic (rwxr-xr-x).",
    category: "dev",
    available: true,
    iconColor: "text-blue-600",
  },
  {
    slug: "hmac-generator",
    name: "HMAC Webhook Generator",
    description: "Compute cryptographic HMAC SHA-256 and SHA-512 signatures for Stripe, GitHub, Shopify webhooks.",
    category: "dev",
    available: true,
    iconColor: "text-violet-600",
  },
  {
    slug: "docker-run-to-compose",
    name: "Docker Run to Compose",
    description: "Convert docker run commands into clean, standard docker-compose.yml specifications.",
    category: "dev",
    available: true,
    iconColor: "text-cyan-600",
  },
  {
    slug: "cyberchef",
    name: "CyberChef Workbench",
    description: "The Cyber Swiss Army Knife. 300+ client-side operations: encryption, encoding, compression, and analysis.",
    category: "dev",
    available: true,
    iconColor: "text-amber-600",
  },`;

const isCrlf = content.includes('\r\n');
const newline = isCrlf ? '\r\n' : '\n';

// Check if already registered
if (!content.includes('slug: "page-numbers"')) {
  const pdfIdx = content.indexOf(pdfAnchor);
  if (pdfIdx !== -1) {
    const pdfClosingBrace = content.indexOf('},', pdfIdx);
    content = content.slice(0, pdfClosingBrace + 2) + newline + newPdfTools + content.slice(pdfClosingBrace + 2);
  }
}

if (!content.includes('slug: "cron-generator"')) {
  const devIdx = content.indexOf(devAnchor);
  if (devIdx !== -1) {
    const devClosingBrace = content.indexOf('},', devIdx);
    content = content.slice(0, devClosingBrace + 2) + newline + newDevTools + content.slice(devClosingBrace + 2);
  }
}

fs.writeFileSync(toolsFilePath, content, 'utf8');
console.log('Registered 10 new tools in tools.ts successfully!');
