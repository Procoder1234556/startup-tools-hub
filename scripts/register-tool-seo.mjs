import fs from 'fs';
import path from 'path';

const seoFilePath = path.resolve('apps/web/lib/tool-seo.ts');
let content = fs.readFileSync(seoFilePath, 'utf8');

const anchor = '  "yaml-json-converter": {';

const newEntries = `  "page-numbers": {
    slug: "page-numbers",
    name: "Add Page Numbers",
    title: "Add Page Numbers to PDF Online — Free, No Watermark",
    description: "Insert customizable page numbers into your PDF. Position, format, font size, margins, and starting page. 100% private in browser.",
    keywords: ["add page numbers to pdf", "pdf page numberer", "number pdf pages online", "pdf page numbering free", "bento pdf page number"],
  },
  "organize-pdf": {
    slug: "organize-pdf",
    name: "Organize PDF Pages",
    title: "Organize PDF Pages — Reorder, Rotate, Delete Pages Free",
    description: "Visually reorder, rotate, delete, or duplicate pages in your PDF document. Browser-side processing, no upload.",
    keywords: ["organize pdf", "reorder pdf pages", "delete pages from pdf", "pdf page manager", "rearrange pdf pages free"],
  },
  "metadata-editor": {
    slug: "metadata-editor",
    name: "PDF Metadata Editor",
    title: "PDF Metadata Editor & Sanitizer — Edit or Strip PDF Meta",
    description: "View and edit PDF Title, Author, Subject, Keywords, Creator. Wipe metadata for document privacy before sharing.",
    keywords: ["pdf metadata editor", "strip pdf metadata", "remove author from pdf", "edit pdf title", "sanitize pdf"],
  },
  "sign-pdf": {
    slug: "sign-pdf",
    name: "Sign PDF",
    title: "Sign PDF Document Online Free — Draw, Type, or Stamp",
    description: "Electronically sign contracts, NDAs, and agreements. Draw, type cursive signature, or upload image with date stamp.",
    keywords: ["sign pdf", "electronic signature pdf", "sign pdf online free", "draw signature pdf", "free contract signer"],
  },
  "stirling-suite": {
    slug: "stirling-suite",
    name: "Stirling-PDF Companion",
    title: "Stirling-PDF Companion Suite — OCR, PDF/A, Repair & Barcodes",
    description: "Bridge to self-hosted Stirling-PDF Docker container for heavy OCR, archival PDF/A conversion, document repairs, and barcode splitting.",
    keywords: ["stirling pdf", "stirling pdf docker", "pdf ocr self hosted", "pdf a conversion", "repair pdf docker"],
  },
  "cron-generator": {
    slug: "cron-generator",
    name: "Cron Generator",
    title: "Crontab / Cron Expression Generator & Explainer — Free Dev Tool",
    description: "Visual cron expression builder, human-readable schedule explanations, and upcoming run time calculations.",
    keywords: ["cron generator", "crontab generator", "cron expression explainer", "cron schedule builder", "next cron run"],
  },
  "chmod-calculator": {
    slug: "chmod-calculator",
    name: "chmod Calculator",
    title: "Linux chmod Calculator — Octal & Symbolic Permission Converter",
    description: "Visual Unix permissions calculator. Convert between octal (755, 644, 600) and symbolic (rwxr-xr-x) with shell commands.",
    keywords: ["chmod calculator", "linux permissions calculator", "chmod 755 644", "octal permissions", "symbolic permissions"],
  },
  "hmac-generator": {
    slug: "hmac-generator",
    name: "HMAC Generator",
    title: "HMAC Webhook Signature Generator — SHA-256, SHA-512",
    description: "Compute and verify cryptographic HMAC signatures for Stripe, GitHub, Shopify, and Slack webhooks. 100% private in browser.",
    keywords: ["hmac generator", "webhook signature generator", "stripe webhook signature", "hmac sha256", "github webhook secret"],
  },
  "docker-run-to-compose": {
    slug: "docker-run-to-compose",
    name: "Docker Run to Compose",
    title: "Docker Run to Docker Compose Converter — Instant YAML",
    description: "Convert docker run commands into clean docker-compose.yml specifications. Supports ports, volumes, envs, and restart policies.",
    keywords: ["docker run to compose", "convert docker run to docker compose", "docker-compose yml generator", "docker run parser"],
  },
  "cyberchef": {
    slug: "cyberchef",
    name: "CyberChef",
    title: "CyberChef Online — The Cyber Swiss Army Knife",
    description: "Client-side cyber tool for encryption, encoding, compression, hashing, and data analysis with 300+ operations.",
    keywords: ["cyberchef", "gchq cyberchef online", "cyber swiss army knife", "hex dump online", "base64 cyberchef"],
  },
`;

const isCrlf = content.includes('\r\n');
const newline = isCrlf ? '\r\n' : '\n';

if (!content.includes('"page-numbers": {')) {
  const idx = content.indexOf(anchor);
  if (idx !== -1) {
    content = content.slice(0, idx) + newEntries + content.slice(idx);
    fs.writeFileSync(seoFilePath, content, 'utf8');
    console.log('Registered 10 new tools in tool-seo.ts successfully!');
  } else {
    console.error('Could not find anchor in tool-seo.ts');
  }
} else {
  console.log('Already registered in tool-seo.ts');
}
