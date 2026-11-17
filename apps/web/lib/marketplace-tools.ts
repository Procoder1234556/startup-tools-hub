import {
  FileText,
  QrCode,
  Braces,
  Image as ImageIcon,
  Calculator,
  Lock,
  Shield,
  ShieldCheck,
  Wrench,
  Zap,
  Code2,
  RefreshCw,
  TrendingUp,
  Briefcase,
  Layers,
  FileCode,
  Eye,
  Terminal,
  KeyRound,
  FileSpreadsheet,
  Palette,
  Type,
  Hash,
  Globe,
  Sliders,
  Maximize2,
  Check,
  Copy,
  Clock,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

export type ToolTemplateType =
  | "editor"
  | "file-upload"
  | "generator"
  | "calculator"
  | "image"
  | "pdf-workspace";

export interface ToolFAQItem {
  q: string;
  a: string;
}

export interface MarketplaceTool {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: string;
  categorySlug: string;
  template: ToolTemplateType;
  icon: LucideIcon;
  iconColor: string;
  bgColor: string;
  href: string;
  isPopular?: boolean;
  isNew?: boolean;
  isDev?: boolean;
  codeSnippet?: string;
  inBrowser?: boolean;
  features: string[];
  howToUse: string[];
  faq: ToolFAQItem[];
  relatedSlugs: string[];
  config?: Record<string, any>;
}

export interface CategoryItem {
  id: string;
  title: string;
  count: number;
  icon: LucideIcon;
  iconColor: string;
  bgColor: string;
  borderColor: string;
  description: string;
}

export const CATEGORIES_LIST: CategoryItem[] = [
  {
    id: "pdf",
    title: "PDF & Documents",
    count: 18,
    icon: FileText,
    iconColor: "text-rose-600",
    bgColor: "bg-rose-50",
    borderColor: "hover:border-rose-300",
    description: "Merge, split, compress, edit and organize PDF pages.",
  },
  {
    id: "dev",
    title: "Developer Tools",
    count: 24,
    icon: Code2,
    iconColor: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "hover:border-blue-300",
    description: "JSON, JWT, regex, base64, SQL and code formatters.",
  },
  {
    id: "generators",
    title: "Generators",
    count: 15,
    icon: Sparkles,
    iconColor: "text-purple-600",
    bgColor: "bg-purple-50",
    borderColor: "hover:border-purple-300",
    description: "QR codes, passwords, UUIDs, lorem ipsum and tokens.",
  },
  {
    id: "image",
    title: "Image Tools",
    count: 14,
    icon: ImageIcon,
    iconColor: "text-amber-600",
    bgColor: "bg-amber-50",
    borderColor: "hover:border-amber-300",
    description: "Compress, resize, crop, convert and remove backgrounds.",
  },
  {
    id: "text",
    title: "Text Tools",
    count: 16,
    icon: Type,
    iconColor: "text-emerald-600",
    bgColor: "bg-emerald-50",
    borderColor: "hover:border-emerald-300",
    description: "Word counters, case converters, sluggers and cleaners.",
  },
  {
    id: "converters",
    title: "Converters",
    count: 12,
    icon: RefreshCw,
    iconColor: "text-cyan-600",
    bgColor: "bg-cyan-50",
    borderColor: "hover:border-cyan-300",
    description: "Units, currencies, timestamp, colors and data sizes.",
  },
  {
    id: "calc",
    title: "Calculators",
    count: 20,
    icon: Calculator,
    iconColor: "text-indigo-600",
    bgColor: "bg-indigo-50",
    borderColor: "hover:border-indigo-300",
    description: "Math, percentages, age, BMI, discounts and loan formulas.",
  },
  {
    id: "productivity",
    title: "Productivity",
    count: 10,
    icon: Zap,
    iconColor: "text-yellow-600",
    bgColor: "bg-yellow-50",
    borderColor: "hover:border-yellow-300",
    description: "Pomodoro timers, checklists, diff checkers and scratchpads.",
  },
  {
    id: "seo",
    title: "SEO & Marketing",
    count: 11,
    icon: Globe,
    iconColor: "text-teal-600",
    bgColor: "bg-teal-50",
    borderColor: "hover:border-teal-300",
    description: "Meta tag analyzers, robots.txt builders, sitemaps and SERP.",
  },
  {
    id: "security",
    title: "Security & Privacy",
    count: 9,
    icon: ShieldCheck,
    iconColor: "text-violet-600",
    bgColor: "bg-violet-50",
    borderColor: "hover:border-violet-300",
    description: "Password meters, hash generators, key pairs and ciphers.",
  },
  {
    id: "business",
    title: "Business Tools",
    count: 14,
    icon: Briefcase,
    iconColor: "text-sky-600",
    bgColor: "bg-sky-50",
    borderColor: "hover:border-sky-300",
    description: "Invoices, runway, SAFE notes, profit margins and GST.",
  },
  {
    id: "utilities",
    title: "General Utilities",
    count: 15,
    icon: Wrench,
    iconColor: "text-slate-600",
    bgColor: "bg-slate-100",
    borderColor: "hover:border-slate-300",
    description: "Random pickers, timers, sound generators and everyday helpers.",
  },
];

// ── Canonical Tools Registry ────────────────────────────────────────
export const ALL_TOOLS: MarketplaceTool[] = [
  // ──────────────────────────────────────────────────────────────────
  // PDF & Documents
  // ──────────────────────────────────────────────────────────────────
  {
    id: "pdf-editor",
    slug: "pdf-editor",
    name: "PDF Editor",
    tagline: "Edit, annotate, rotate, and re-order PDF pages directly in your browser.",
    description:
      "Edit PDF documents directly in your browser. Annotate text, add digital signature stamps, rearrange pages, and export clean print-ready documents without software downloads.",
    category: "PDF & Documents",
    categorySlug: "pdf",
    template: "pdf-workspace",
    icon: FileText,
    iconColor: "text-rose-600",
    bgColor: "bg-rose-50",
    href: "/tools/pdf/pdf-editor",
    isPopular: true,
    inBrowser: true,
    features: [
      "100% Client-Side Privacy — files never leave your device",
      "Interactive page thumbnails and visual page reordering",
      "Add text boxes, highlighters, and signature stamps",
      "Zero file size limit and no watermark insertion",
    ],
    howToUse: [
      "Upload or drop your PDF document into the editor canvas",
      "Use the toolbar to select text, add highlights, or place signatures",
      "Select thumbnails in the sidebar to reorder or rotate specific pages",
      "Click 'Export PDF' to download the finalized document",
    ],
    faq: [
      {
        q: "Are my PDF documents uploaded to a cloud server?",
        a: "No. The PDF Editor runs 100% client-side in your web browser using WebAssembly. Your files are never stored or transmitted.",
      },
      {
        q: "Can I add legal digital signatures?",
        a: "Yes. You can place signature annotations and date stamps directly onto contracts and agreements.",
      },
      {
        q: "Is there a page count limit?",
        a: "No. You can edit documents of any page count supported by your computer's memory.",
      },
    ],
    relatedSlugs: ["merge-pdf", "split-pdf", "compress-pdf", "pdf-to-word", "unlock-pdf"],
  },
  {
    id: "merge-pdf",
    slug: "merge-pdf",
    name: "PDF Merger",
    tagline: "Combine multiple PDF files into a single consolidated document in seconds.",
    description:
      "Merge multiple PDF documents into one unified file. Drag to reorder pages, remove unnecessary sheets, and export a clean PDF without quality degradation.",
    category: "PDF & Documents",
    categorySlug: "pdf",
    template: "file-upload",
    icon: Layers,
    iconColor: "text-rose-600",
    bgColor: "bg-rose-50",
    href: "/tools/pdf/merge-pdf",
    isPopular: true,
    inBrowser: true,
    features: [
      "Combine unlimited PDF documents with zero page limits",
      "Drag-and-drop file reordering before processing",
      "Lossless quality retention for crisp vector text and graphics",
      "Fast in-memory processing without server queues",
    ],
    howToUse: [
      "Drag and drop two or more PDF files into the dropzone",
      "Arrange the file sequence in your desired merge order",
      "Click 'Merge PDFs' to combine the documents",
      "Download your combined single PDF document",
    ],
    faq: [
      {
        q: "Can I merge password-protected PDFs?",
        a: "You must first unlock any password-protected PDFs using our PDF Unlocker tool before merging.",
      },
      {
        q: "Does merging reduce text quality or image sharpness?",
        a: "No. Pages are merged losslessly without re-encoding existing text or raster assets.",
      },
    ],
    relatedSlugs: ["pdf-editor", "split-pdf", "compress-pdf", "word-to-pdf"],
    config: {
      actionName: "Merge PDFs",
      accept: ".pdf",
      multiple: true,
      successMessage: "PDF files merged successfully!",
      downloadFileName: "merged-document.pdf",
    },
  },
  {
    id: "split-pdf",
    slug: "split-pdf",
    name: "PDF Splitter",
    tagline: "Extract specific page ranges or split PDF documents into separate files.",
    description:
      "Separate pages from your PDF file. Specify page intervals (e.g. 1-4, 7, 10-12) or extract every page into individual single-page documents.",
    category: "PDF & Documents",
    categorySlug: "pdf",
    template: "file-upload",
    icon: FileText,
    iconColor: "text-rose-600",
    bgColor: "bg-rose-50",
    href: "/tools/pdf/split-pdf",
    inBrowser: true,
    features: [
      "Custom page range extraction (e.g., 1-5, 8, 11-14)",
      "Extract each page into a separate individual file",
      "Instant client-side extraction with zero upload wait",
      "ZIP download bundle for multi-page batch exports",
    ],
    howToUse: [
      "Upload your PDF document",
      "Enter the target page numbers or page range to extract",
      "Click 'Split PDF'",
      "Download the extracted PDF pages",
    ],
    faq: [
      {
        q: "How do I specify multiple page ranges?",
        a: "Separate ranges with commas, for example: '1-3, 5, 8-10'.",
      },
    ],
    relatedSlugs: ["merge-pdf", "pdf-editor", "compress-pdf"],
    config: {
      actionName: "Split PDF",
      accept: ".pdf",
      multiple: false,
      hasOptions: true,
      optionLabel: "Page Range (e.g. 1-3, 5, 7-10)",
      optionDefault: "1-2",
      downloadFileName: "extracted-pages.pdf",
    },
  },
  {
    id: "compress-pdf",
    slug: "compress-pdf",
    name: "PDF Compressor",
    tagline: "Reduce PDF file size up to 80% for email attachments while keeping text sharp.",
    description:
      "Shrink oversized PDF documents without losing text legibility. Select from low, medium, or high compression modes to achieve the optimal balance between size and quality.",
    category: "PDF & Documents",
    categorySlug: "pdf",
    template: "file-upload",
    icon: FileText,
    iconColor: "text-rose-600",
    bgColor: "bg-rose-50",
    href: "/tools/pdf/compress-pdf",
    inBrowser: true,
    features: [
      "Configurable compression levels (Recommended, High, Maximum)",
      "Reduces file footprint by up to 80% for email limits",
      "Preserves embedded hyperlinks, forms, and bookmark trees",
      "Immediate before/after file size reduction metrics",
    ],
    howToUse: [
      "Select or drop your PDF document",
      "Choose your preferred compression level",
      "Click 'Compress PDF'",
      "Inspect the reduced file size and download",
    ],
    faq: [
      {
        q: "Will images in my PDF become pixelated?",
        a: "The recommended preset preserves standard 150 DPI resolution suitable for viewing and printing.",
      },
    ],
    relatedSlugs: ["merge-pdf", "pdf-editor", "pdf-to-word"],
    config: {
      actionName: "Compress PDF",
      accept: ".pdf",
      multiple: false,
      hasSelect: true,
      selectLabel: "Compression Level",
      selectOptions: [
        { label: "Recommended (Balanced size & clarity)", value: "medium" },
        { label: "Extreme Compression (Smallest file size)", value: "high" },
        { label: "Light Compression (Maximum quality)", value: "low" },
      ],
      downloadFileName: "compressed-document.pdf",
    },
  },
  {
    id: "pdf-to-word",
    slug: "pdf-to-word",
    name: "PDF to Word Converter",
    tagline: "Convert PDF documents into fully editable Word (.docx) documents.",
    description:
      "Transform read-only PDF files into editable Microsoft Word documents (.docx). Retains layout positioning, paragraph styling, and tables accurately.",
    category: "PDF & Documents",
    categorySlug: "pdf",
    template: "file-upload",
    icon: FileText,
    iconColor: "text-rose-600",
    bgColor: "bg-rose-50",
    href: "/tools/pdf/pdf-to-word",
    inBrowser: true,
    features: [
      "High accuracy text and formatting extraction",
      "Converts tables into native editable Microsoft Word tables",
      "Preserves fonts and paragraph margins",
      "Zero registration or watermarking required",
    ],
    howToUse: [
      "Upload your PDF file",
      "Click 'Convert to Word'",
      "Wait a few moments while document elements are parsed",
      "Download your editable .docx document",
    ],
    faq: [
      {
        q: "Can I open the exported file in Google Docs?",
        a: "Yes. The generated .docx file is 100% compatible with Word, Google Docs, and LibreOffice.",
      },
    ],
    relatedSlugs: ["word-to-pdf", "pdf-editor", "merge-pdf"],
    config: {
      actionName: "Convert to Word (.docx)",
      accept: ".pdf",
      downloadFileName: "converted-document.docx",
    },
  },
  {
    id: "word-to-pdf",
    slug: "word-to-pdf",
    name: "Word to PDF Converter",
    tagline: "Convert DOC and DOCX files into universal, print-ready PDF files.",
    description:
      "Turn Word documents into clean, professional PDF files with consistent formatting across all operating systems and devices.",
    category: "PDF & Documents",
    categorySlug: "pdf",
    template: "file-upload",
    icon: FileText,
    iconColor: "text-rose-600",
    bgColor: "bg-rose-50",
    href: "/tools/pdf/word-to-pdf",
    inBrowser: true,
    features: [
      "Converts both legacy .doc and modern .docx files",
      "Locks formatting so documents appear identical on every screen",
      "Includes bookmark navigation and clickable links",
    ],
    howToUse: [
      "Upload your Word document (.doc or .docx)",
      "Click 'Convert to PDF'",
      "Download the PDF file",
    ],
    faq: [
      {
        q: "Will custom fonts look correct in the PDF?",
        a: "Standard typography is converted smoothly into embedded PDF type.",
      },
    ],
    relatedSlugs: ["pdf-to-word", "pdf-editor", "compress-pdf"],
    config: {
      actionName: "Convert to PDF",
      accept: ".doc,.docx",
      downloadFileName: "document.pdf",
    },
  },
  {
    id: "unlock-pdf",
    slug: "unlock-pdf",
    name: "PDF Unlocker",
    tagline: "Remove owner passwords, printing blocks, and edit restrictions from PDF files.",
    description:
      "Unlock PDF files by stripping restriction flags, permissions passwords, and print blocks so you can freely highlight, copy, and annotate your documents.",
    category: "PDF & Documents",
    categorySlug: "pdf",
    template: "file-upload",
    icon: Lock,
    iconColor: "text-rose-600",
    bgColor: "bg-rose-50",
    href: "/tools/pdf/unlock-pdf",
    inBrowser: true,
    features: [
      "Removes printing, editing, and copying restrictions",
      "Client-side decryption without sending credentials over network",
      "Exports clean, unconstrained PDF files",
    ],
    howToUse: [
      "Upload your restricted PDF file",
      "If prompted for an open password, provide it once",
      "Click 'Unlock PDF'",
      "Download your unrestricted PDF",
    ],
    faq: [
      {
        q: "Can this remove unknown passwords?",
        a: "If the document has an open password, you must enter it once so the client engine can decrypt and resave without restrictions.",
      },
    ],
    relatedSlugs: ["pdf-editor", "merge-pdf", "compress-pdf"],
    config: {
      actionName: "Unlock PDF",
      accept: ".pdf",
      hasPassword: true,
      downloadFileName: "unlocked-document.pdf",
    },
  },

  // ──────────────────────────────────────────────────────────────────
  // Developer Tools
  // ──────────────────────────────────────────────────────────────────
  {
    id: "json-formatter",
    slug: "json-formatter",
    name: "JSON Formatter",
    tagline: "Format, validate, prettify, and minify JSON with real-time syntax checking.",
    description:
      "Format messy JSON strings into clean, indented code. Check JSON syntax errors with exact line-number markers, sort keys alphabetically, and minify payloads for production APIs.",
    category: "Developer Tools",
    categorySlug: "dev",
    template: "editor",
    icon: Braces,
    iconColor: "text-blue-600",
    bgColor: "bg-blue-50",
    href: "/tools/dev/json-formatter",
    isPopular: true,
    isDev: true,
    codeSnippet: `{ "status": 200, "valid": true }`,
    inBrowser: true,
    features: [
      "Custom indentation (2 spaces, 4 spaces, tabs, or minified)",
      "Instant syntax error diagnostics with line and column highlighting",
      "Alphabetical object key sorting option",
      "One-click copy and JSON file download",
    ],
    howToUse: [
      "Paste your raw JSON into the input editor or click 'Load Sample'",
      "Choose your preferred indentation mode from the toolbar",
      "Click 'Format JSON' or 'Minify'",
      "Copy formatted output or download as a .json file",
    ],
    faq: [
      {
        q: "Does this validate JSON schema?",
        a: "Yes. It verifies strict JSON standard compliance (RFC 8259) and flags syntax errors immediately.",
      },
      {
        q: "Is there any payload size limit?",
        a: "The formatter handles multi-megabyte JSON payloads directly in your browser's V8 engine.",
      },
    ],
    relatedSlugs: ["json-validator", "json-to-csv", "jwt-decoder", "base64-encoder", "sql-formatter"],
    config: {
      editorMode: "json",
      defaultSample: `{\n  "service": "ToolBox Hub",\n  "status": "online",\n  "tools_count": 100,\n  "features": ["no-login", "fast", "private"],\n  "latency_ms": 14\n}`,
    },
  },
  {
    id: "json-validator",
    slug: "json-validator",
    name: "JSON Validator",
    tagline: "Validate JSON syntax according to strict RFC specifications with line diagnostics.",
    description:
      "Verify whether a JSON payload is syntactically valid. Pinpoint unclosed quotes, trailing commas, invalid escape sequences, and malformed arrays.",
    category: "Developer Tools",
    categorySlug: "dev",
    template: "editor",
    icon: Braces,
    iconColor: "text-blue-600",
    bgColor: "bg-blue-50",
    href: "/tools/dev/json-validator",
    isDev: true,
    codeSnippet: `validateJSON(payload) -> true`,
    inBrowser: true,
    features: [
      "Strict RFC 8259 compliance verification",
      "Line & column error diagnostics",
      "Identifies trailing commas and invalid literals",
      "Tree structure depth validation",
    ],
    howToUse: [
      "Paste JSON into the input box",
      "Click 'Validate JSON'",
      "Review the error breakdown or verification badge",
    ],
    faq: [
      {
        q: "Are trailing commas valid in JSON?",
        a: "No. Standard JSON rejects trailing commas in arrays and objects; this validator flags them.",
      },
    ],
    relatedSlugs: ["json-formatter", "json-to-csv", "jwt-decoder"],
    config: {
      editorMode: "json",
      defaultSample: `{\n  "name": "QuickTools",\n  "active": true,\n  "code": 200\n}`,
    },
  },
  {
    id: "json-generator",
    slug: "json-generator",
    name: "JSON Generator",
    tagline: "Generate structured mock JSON datasets for API testing and frontend prototyping.",
    description:
      "Create realistic mock JSON schemas with fake names, emails, addresses, UUIDs, and timestamps. Perfect for mocking backend endpoints during frontend development.",
    category: "Developer Tools",
    categorySlug: "dev",
    template: "generator",
    icon: Braces,
    iconColor: "text-blue-600",
    bgColor: "bg-blue-50",
    href: "/tools/dev/json-generator",
    isDev: true,
    inBrowser: true,
    features: [
      "Generate arrays of 1 to 50 realistic mock records",
      "Includes realistic names, emails, avatars, and dates",
      "Instant copy and download as .json",
    ],
    howToUse: [
      "Select the number of mock records to generate",
      "Choose the data schema (Users, Products, or Transactions)",
      "Click 'Generate JSON'",
      "Copy or export the generated dataset",
    ],
    faq: [
      {
        q: "Can I customize the field structure?",
        a: "Yes. You can toggle between Users, Ecommerce Products, and API Log schemas.",
      },
    ],
    relatedSlugs: ["json-formatter", "uuid-generator", "api-tester"],
    config: {
      generatorType: "json",
    },
  },
  {
    id: "api-tester",
    slug: "api-tester",
    name: "API Tester & cURL Builder",
    tagline: "Send HTTP requests, inspect headers, status codes, and generate cURL snippets.",
    description:
      "Test REST APIs, dispatch GET and POST requests, set custom headers, and generate copyable cURL commands with zero software setup.",
    category: "Developer Tools",
    categorySlug: "dev",
    template: "editor",
    icon: Terminal,
    iconColor: "text-blue-600",
    bgColor: "bg-blue-50",
    href: "/tools/dev/api-tester",
    isDev: true,
    codeSnippet: `curl -X GET https://api.example.com`,
    inBrowser: true,
    features: [
      "Methods supported: GET, POST, PUT, DELETE, PATCH",
      "Custom request headers and JSON request body editor",
      "Live cURL command generation",
      "Inspect status code, response time, and payload",
    ],
    howToUse: [
      "Select HTTP method and enter the target API URL",
      "Add custom request headers or body payload if needed",
      "Click 'Send Request' or copy the generated cURL command",
      "Inspect response payload in the output panel",
    ],
    faq: [
      {
        q: "How does this handle CORS restrictions?",
        a: "Requests to CORS-enabled endpoints execute directly in your browser. For restricted APIs, use the generated cURL snippet in your terminal.",
      },
    ],
    relatedSlugs: ["json-formatter", "jwt-decoder", "base64-encoder"],
    config: {
      editorMode: "api",
      defaultSample: `https://jsonplaceholder.typicode.com/posts/1`,
    },
  },
  {
    id: "jwt-decoder",
    slug: "jwt-decoder",
    name: "JWT Decoder",
    tagline: "Decode JSON Web Tokens, inspect header claims, payload, and expiration safely.",
    description:
      "Decode JWTs instantly. Parse the Header (algorithm), Payload (claims, sub, exp, iat), and view expiration human-readable countdowns without sending your token to any server.",
    category: "Developer Tools",
    categorySlug: "dev",
    template: "editor",
    icon: KeyRound,
    iconColor: "text-indigo-600",
    bgColor: "bg-indigo-50",
    href: "/tools/dev/jwt-decoder",
    isDev: true,
    codeSnippet: `eyJhbGciOi... -> { "sub": "123" }`,
    inBrowser: true,
    features: [
      "Color-coded visual separation: Header, Payload, Signature",
      "Decodes claims, issued-at, and expiration timestamps",
      "100% Client-side — token never touches external servers",
      "Detects expired tokens automatically",
    ],
    howToUse: [
      "Paste your Bearer token or raw JWT into the input field",
      "Inspect the decoded Header and Payload panels",
      "Check expiration validity and claims",
    ],
    faq: [
      {
        q: "Is it safe to paste production JWTs here?",
        a: "Yes. Decoding uses client-side Base64URL parsing. No network calls are made.",
      },
    ],
    relatedSlugs: ["json-formatter", "base64-encoder", "hash-generator"],
    config: {
      editorMode: "jwt",
      defaultSample: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvY2hlbiBEb2UiLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE4MDAwMDAwMDB9.signature`,
    },
  },
  {
    id: "regex-tester",
    slug: "regex-tester",
    name: "Regex Tester",
    tagline: "Test regular expressions with real-time match highlighting and capture groups.",
    description:
      "Build, test, and debug regular expressions in JavaScript syntax. See instant match highlighting, capture groups breakdown, and test string replacements.",
    category: "Developer Tools",
    categorySlug: "dev",
    template: "editor",
    icon: Code2,
    iconColor: "text-blue-600",
    bgColor: "bg-blue-50",
    href: "/tools/dev/regex-tester",
    isDev: true,
    codeSnippet: `/[a-zA-Z0-9._%+-]+@[a-z0-9.-]+/g`,
    inBrowser: true,
    features: [
      "Real-time visual match highlighting as you type",
      "Flags toggling: Global (g), Case-Insensitive (i), Multiline (m)",
      "Capture groups list and match index offsets",
      "Library of common regex patterns (Email, URL, IP, Phone)",
    ],
    howToUse: [
      "Enter your regular expression pattern and flags",
      "Paste test text into the test canvas",
      "Review the highlighted matches and capture groups",
    ],
    faq: [
      {
        q: "What regex engine is used?",
        a: "It uses your browser's native JavaScript RegExp engine with standard ECMAScript syntax.",
      },
    ],
    relatedSlugs: ["text-cleaner", "json-formatter", "slug-generator"],
    config: {
      editorMode: "regex",
      defaultSample: `contact@toolboxhub.org and admin@developer.dev`,
    },
  },
  {
    id: "base64-encoder",
    slug: "base64-encoder",
    name: "Base64 Encoder & Decoder",
    tagline: "Encode plain text or binary data into Base64 strings and decode back cleanly.",
    description:
      "Convert ASCII and UTF-8 strings into Base64 format and decode Base64 strings back to text. Supports standard and URL-safe Base64 encoding.",
    category: "Developer Tools",
    categorySlug: "dev",
    template: "editor",
    icon: RefreshCw,
    iconColor: "text-cyan-600",
    bgColor: "bg-cyan-50",
    href: "/tools/dev/base64-encoder",
    isDev: true,
    codeSnippet: `SGVsbG8gV29ybGQ= <=> Hello World`,
    inBrowser: true,
    features: [
      "Bi-directional: Encode to Base64 and Decode from Base64",
      "Full UTF-8 character encoding support",
      "URL-safe Base64 mode toggle (replaces + and /)",
      "Instant copy to clipboard",
    ],
    howToUse: [
      "Enter or paste text into the input panel",
      "Click 'Encode' or 'Decode'",
      "Copy the result from the output window",
    ],
    faq: [
      {
        q: "Does this support non-English characters?",
        a: "Yes. It supports Unicode and emoji characters without mangling bytes.",
      },
    ],
    relatedSlugs: ["url-encoder", "jwt-decoder", "hash-generator"],
    config: {
      editorMode: "base64",
      defaultSample: `Hello from ToolBox Hub! 🚀`,
    },
  },
  {
    id: "url-encoder",
    slug: "url-encoder",
    name: "URL Encoder & Decoder",
    tagline: "Encode special characters into percent-encoding or decode query parameters.",
    description:
      "Convert special characters and reserved URI symbols into percent-encoded entities (encodeURIComponent) or decode query strings into readable URLs.",
    category: "Developer Tools",
    categorySlug: "dev",
    template: "editor",
    icon: Globe,
    iconColor: "text-blue-600",
    bgColor: "bg-blue-50",
    href: "/tools/dev/url-encoder",
    isDev: true,
    codeSnippet: `https%3A%2F%2Fexample.com%3Fq%3Dtools`,
    inBrowser: true,
    features: [
      "Standard encodeURIComponent and decodeURIComponent execution",
      "Handles query parameters, spaces, symbols, and Unicode",
      "One-click swapping between encoded and decoded strings",
    ],
    howToUse: [
      "Paste your URL or parameter string",
      "Click 'Encode URL' or 'Decode URL'",
      "Copy the converted output",
    ],
    faq: [
      {
        q: "What characters get encoded?",
        a: "Spaces become %20, slashes become %2F, ampersands become %26, etc.",
      },
    ],
    relatedSlugs: ["base64-encoder", "slug-generator", "api-tester"],
    config: {
      editorMode: "url",
      defaultSample: `https://toolboxhub.org/search?q=developer tools & privacy=100%`,
    },
  },
  {
    id: "html-formatter",
    slug: "html-formatter",
    name: "HTML Formatter & Minifier",
    tagline: "Beautify messy HTML markup with clean indentations and tag closing.",
    description:
      "Format unindented or minified HTML markup with proper spacing, indentation, and clean tag hierarchy. Alternatively, minify HTML to reduce bandwidth.",
    category: "Developer Tools",
    categorySlug: "dev",
    template: "editor",
    icon: Code2,
    iconColor: "text-blue-600",
    bgColor: "bg-blue-50",
    href: "/tools/dev/html-formatter",
    isDev: true,
    inBrowser: true,
    features: [
      "Format HTML with 2 or 4 spaces indentation",
      "Minify HTML markup removing comments and whitespace",
      "Cleans up void tags and inline attributes",
    ],
    howToUse: [
      "Paste raw HTML code",
      "Select 'Format' or 'Minify'",
      "Copy the cleanly formatted output",
    ],
    faq: [
      {
        q: "Does this affect JavaScript script tags inside HTML?",
        a: "Inline script and style blocks are preserved cleanly.",
      },
    ],
    relatedSlugs: ["sql-formatter", "json-formatter", "markdown-previewer"],
    config: {
      editorMode: "html",
      defaultSample: `<div class="card"><header><h1>Welcome</h1></header><main><p>ToolBox Hub</p></main></div>`,
    },
  },
  {
    id: "sql-formatter",
    slug: "sql-formatter",
    name: "SQL Formatter",
    tagline: "Format SQL queries across PostgreSQL, MySQL, SQLite, and Snowflake.",
    description:
      "Beautify complex SQL statements with capitalized keywords, structured indentation for SELECT, FROM, WHERE, JOIN, and subqueries.",
    category: "Developer Tools",
    categorySlug: "dev",
    template: "editor",
    icon: Terminal,
    iconColor: "text-blue-600",
    bgColor: "bg-blue-50",
    href: "/tools/dev/sql-formatter",
    isDev: true,
    inBrowser: true,
    features: [
      "Uppercase SQL keywords automatically (SELECT, INSERT, UPDATE, JOIN)",
      "Multi-dialect compatibility (PostgreSQL, MySQL, SQLite)",
      "Formats nested subqueries and CASE statements",
    ],
    howToUse: [
      "Paste unformatted SQL query",
      "Click 'Format SQL'",
      "Copy the formatted query",
    ],
    faq: [
      {
        q: "Does it support PostgreSQL CTEs (WITH queries)?",
        a: "Yes. Common table expressions and window functions are formatted with proper alignment.",
      },
    ],
    relatedSlugs: ["html-formatter", "json-formatter", "api-tester"],
    config: {
      editorMode: "sql",
      defaultSample: `select u.id, u.email, count(o.id) as total_orders from users u left join orders o on u.id = o.user_id where u.active = true group by u.id, u.email order by total_orders desc limit 10;`,
    },
  },
  {
    id: "uuid-generator",
    slug: "uuid-generator",
    name: "UUID Generator",
    tagline: "Generate random v4 and v1 UUIDs and GUIDs in bulk with one click.",
    description:
      "Generate cryptographically random UUIDs (version 4) or time-based UUIDs (version 1). Customize count, uppercase/lowercase, and hyphens.",
    category: "Developer Tools",
    categorySlug: "dev",
    template: "generator",
    icon: Hash,
    iconColor: "text-blue-600",
    bgColor: "bg-blue-50",
    href: "/tools/dev/uuid-generator",
    isPopular: true,
    isDev: true,
    codeSnippet: `uuidv4() -> f47ac10b-58cc...`,
    inBrowser: true,
    features: [
      "Generates RFC 4122 compliant version 4 (random) UUIDs",
      "Bulk generation from 1 up to 100 UUIDs",
      "Options: Uppercase, lowercase, remove hyphens",
      "Copy all generated UUIDs at once",
    ],
    howToUse: [
      "Choose the quantity of UUIDs to generate",
      "Toggle formatting options (uppercase, hyphens)",
      "Click 'Generate UUIDs'",
      "Copy the list to clipboard",
    ],
    faq: [
      {
        q: "Are these UUIDs cryptographically secure?",
        a: "Yes. They use crypto.randomUUID() provided by the Web Cryptography API.",
      },
    ],
    relatedSlugs: ["password-generator", "json-generator", "hash-generator"],
    config: {
      generatorType: "uuid",
    },
  },
  {
    id: "timestamp-converter",
    slug: "timestamp-converter",
    name: "Timestamp Converter",
    tagline: "Convert Unix epoch timestamps to UTC and human-readable local dates.",
    description:
      "Convert seconds or milliseconds Unix timestamps into UTC, ISO 8601, and local date formats. Or enter human dates to get Unix epochs.",
    category: "Developer Tools",
    categorySlug: "dev",
    template: "calculator",
    icon: Clock,
    iconColor: "text-cyan-600",
    bgColor: "bg-cyan-50",
    href: "/tools/dev/timestamp-converter",
    isDev: true,
    codeSnippet: `1731792000 -> 2024-11-16T21:20:00Z`,
    inBrowser: true,
    features: [
      "Supports seconds (10 digits) and milliseconds (13 digits)",
      "Real-time live clock showing the current Unix epoch",
      "Bi-directional: Date to Timestamp and Timestamp to Date",
    ],
    howToUse: [
      "Enter a timestamp or pick a calendar date",
      "Inspect the instant breakdown in UTC and Local time",
      "Copy formatted timestamps with one click",
    ],
    faq: [
      {
        q: "What is the Year 2038 problem?",
        a: "32-bit systems overflow on Jan 19, 2038. This converter uses 64-bit precision and works past year 2038.",
      },
    ],
    relatedSlugs: ["time-converter", "age-calculator", "json-formatter"],
    config: {
      calcType: "timestamp",
    },
  },
  {
    id: "json-to-csv",
    slug: "json-to-csv",
    name: "JSON to CSV Converter",
    tagline: "Convert JSON arrays into downloadable CSV or Excel spreadsheets.",
    description:
      "Transform JSON object arrays into comma-separated values (CSV) for Excel, Google Sheets, or data science pipelines.",
    category: "Developer Tools",
    categorySlug: "dev",
    template: "editor",
    icon: FileSpreadsheet,
    iconColor: "text-blue-600",
    bgColor: "bg-blue-50",
    href: "/tools/dev/json-to-csv",
    isNew: true,
    isDev: true,
    inBrowser: true,
    features: [
      "Automatically flattens nested object structures",
      "Configurable delimiters (comma, semicolon, tab)",
      "Instant CSV preview and file download",
    ],
    howToUse: [
      "Paste JSON array into the input editor",
      "Click 'Convert to CSV'",
      "Download the .csv spreadsheet",
    ],
    faq: [
      {
        q: "Can it handle nested arrays?",
        a: "Yes. Nested objects are flattened with dot notation headers.",
      },
    ],
    relatedSlugs: ["json-formatter", "sql-formatter", "table-converter"],
    config: {
      editorMode: "json-to-csv",
      defaultSample: `[\n  {"id": 1, "name": "Alice", "role": "Engineer", "salary": 140000},\n  {"id": 2, "name": "Bob", "role": "Designer", "salary": 125000}\n]`,
    },
  },
  {
    id: "contrast-checker",
    slug: "contrast-checker",
    name: "Color Contrast Checker",
    tagline: "Test WCAG 2.2 AA and AAA color accessibility ratios for text and backgrounds.",
    description:
      "Evaluate color contrast between foreground text and background colors according to WCAG 2.2 accessibility guidelines.",
    category: "Developer Tools",
    categorySlug: "dev",
    template: "calculator",
    icon: Palette,
    iconColor: "text-indigo-600",
    bgColor: "bg-indigo-50",
    href: "/tools/dev/contrast-checker",
    isNew: true,
    isDev: true,
    inBrowser: true,
    features: [
      "Real-time contrast ratio score (e.g. 7.42:1)",
      "Pass/Fail criteria for WCAG AA (4.5:1) and AAA (7:1)",
      "Interactive color pickers and live text preview",
    ],
    howToUse: [
      "Pick or enter text color hex",
      "Pick or enter background color hex",
      "Review the compliance score and preview",
    ],
    faq: [
      {
        q: "What is the minimum WCAG AA ratio for normal text?",
        a: "Normal text requires a contrast ratio of at least 4.5:1.",
      },
    ],
    relatedSlugs: ["color-palette", "html-formatter"],
    config: {
      calcType: "contrast",
    },
  },
  {
    id: "hash-generator",
    slug: "hash-generator",
    name: "Hash Generator",
    tagline: "Calculate cryptographic MD5, SHA-1, SHA-256, and SHA-512 hashes instantly.",
    description:
      "Generate cryptographic checksums and hash digests from any text string using native Web Cryptography algorithms.",
    category: "Developer Tools",
    categorySlug: "dev",
    template: "editor",
    icon: Shield,
    iconColor: "text-violet-600",
    bgColor: "bg-violet-50",
    href: "/tools/dev/hash-generator",
    isDev: true,
    codeSnippet: `sha256("string") -> 2c26b46b6...`,
    inBrowser: true,
    features: [
      "Calculates SHA-256, SHA-512, SHA-384, SHA-1, and MD5",
      "Uses Web Cryptography API for native hardware speed",
      "One-click copy for individual hash algorithms",
    ],
    howToUse: [
      "Type or paste input text",
      "Hashes update immediately across all algorithms",
      "Copy the desired hash digest",
    ],
    faq: [
      {
        q: "Is SHA-256 secure for password storage?",
        a: "SHA-256 is great for integrity checksums; for passwords, use salt and key-stretching (like bcrypt or Argon2).",
      },
    ],
    relatedSlugs: ["password-generator", "base64-encoder", "jwt-decoder"],
    config: {
      editorMode: "hash",
      defaultSample: `ToolBox Hub Secure Hash Payload`,
    },
  },

  // ──────────────────────────────────────────────────────────────────
  // Generators
  // ──────────────────────────────────────────────────────────────────
  {
    id: "qr-code",
    slug: "qr-code",
    name: "QR Code Generator",
    tagline: "Create customizable high-resolution QR codes for links, text, WiFi, and cards.",
    description:
      "Generate custom QR codes instantly. Enter any URL, contact card, or message, customize size and error correction, and download clean SVG or PNG codes.",
    category: "Generators",
    categorySlug: "generators",
    template: "generator",
    icon: QrCode,
    iconColor: "text-purple-600",
    bgColor: "bg-purple-50",
    href: "/tools/generators/qr-code",
    isPopular: true,
    inBrowser: true,
    features: [
      "Supports URLs, plain text, WiFi access, and phone numbers",
      "Adjustable error correction levels (L, M, Q, H)",
      "Instant SVG vector and PNG raster downloads",
      "100% Client-side — QR codes are rendered locally without server tracking",
    ],
    howToUse: [
      "Enter your destination website link or text",
      "Select desired size and error correction level",
      "Download the QR code as PNG or SVG",
    ],
    faq: [
      {
        q: "Do these QR codes expire?",
        a: "No. These are static QR codes that contain your direct URL. They work indefinitely and never expire.",
      },
    ],
    relatedSlugs: ["qr-scanner", "password-generator", "uuid-generator"],
    config: {
      generatorType: "qr",
    },
  },
  {
    id: "qr-scanner",
    slug: "qr-scanner",
    name: "QR Code Scanner",
    tagline: "Scan QR codes and barcodes directly from your camera or uploaded image file.",
    description:
      "Decode QR codes directly in your browser. Upload an image file or use your webcam to scan codes with zero tracking.",
    category: "Generators",
    categorySlug: "generators",
    template: "generator",
    icon: QrCode,
    iconColor: "text-purple-600",
    bgColor: "bg-purple-50",
    href: "/tools/generators/qr-scanner",
    isNew: true,
    inBrowser: true,
    features: [
      "Upload image file or scan via device webcam",
      "Instant URL detection and clipboard copy",
      "100% private in-browser decoding",
    ],
    howToUse: [
      "Upload a QR code image or start camera scan",
      "The decoded content appears immediately",
      "Copy or visit the decoded URL",
    ],
    faq: [
      {
        q: "Is camera access stored or recorded?",
        a: "Never. Camera feeds are processed in local memory only.",
      },
    ],
    relatedSlugs: ["qr-code", "exif-viewer"],
    config: {
      generatorType: "qr-scanner",
    },
  },
  {
    id: "password-generator",
    slug: "password-generator",
    name: "Password Generator",
    tagline: "Generate cryptographically secure passwords with custom symbol requirements.",
    description:
      "Generate strong passwords using browser-native cryptographic randomness. Customize length, uppercase, lowercase, numbers, and symbols.",
    category: "Generators",
    categorySlug: "generators",
    template: "generator",
    icon: Lock,
    iconColor: "text-violet-600",
    bgColor: "bg-violet-50",
    href: "/tools/generators/password-generator",
    isPopular: true,
    inBrowser: true,
    features: [
      "Cryptographically secure randomness via window.crypto",
      "Length slider from 8 to 64 characters",
      "Custom character set toggles (A-Z, a-z, 0-9, !@#$)",
      "Instant password strength and entropy score",
    ],
    howToUse: [
      "Set your desired password length using the slider",
      "Check or uncheck character sets",
      "Click 'Generate Password' or copy directly",
    ],
    faq: [
      {
        q: "Can anyone else see generated passwords?",
        a: "No. Passwords are generated purely on your local machine and never logged.",
      },
    ],
    relatedSlugs: ["uuid-generator", "hash-generator", "qr-code"],
    config: {
      generatorType: "password",
    },
  },
  {
    id: "lorem-ipsum",
    slug: "lorem-ipsum",
    name: "Lorem Ipsum Generator",
    tagline: "Generate placeholder paragraphs, sentences, or lists for UI prototypes.",
    description:
      "Generate classical Latin placeholder text for design mockups, wireframes, and layout testing. Choose paragraphs, sentences, or words.",
    category: "Generators",
    categorySlug: "generators",
    template: "generator",
    icon: Type,
    iconColor: "text-purple-600",
    bgColor: "bg-purple-50",
    href: "/tools/generators/lorem-ipsum",
    inBrowser: true,
    features: [
      "Generate paragraphs, sentences, or word counts",
      "Option to wrap in HTML <p> tags",
      "One-click copy to clipboard",
    ],
    howToUse: [
      "Choose output type (paragraphs, sentences, words)",
      "Set quantity count",
      "Copy generated text",
    ],
    faq: [
      {
        q: "What is the origin of Lorem Ipsum?",
        a: "It derives from Cicero's 45 BC philosophical treatise 'De Finibus Bonorum et Malorum'.",
      },
    ],
    relatedSlugs: ["word-counter", "markdown-previewer", "character-counter"],
    config: {
      generatorType: "lorem",
    },
  },
  {
    id: "random-number",
    slug: "random-number",
    name: "Random Number Generator",
    tagline: "Generate random numbers within any minimum and maximum interval.",
    description:
      "Pick unbiased random integers or decimals. Set custom min and max bounds, generate multiple numbers, and roll dice.",
    category: "Generators",
    categorySlug: "generators",
    template: "generator",
    icon: Calculator,
    iconColor: "text-purple-600",
    bgColor: "bg-purple-50",
    href: "/tools/generators/random-number",
    inBrowser: true,
    features: [
      "Custom Min and Max range bounds",
      "Generate 1 to 50 numbers at once",
      "Option to allow or disallow duplicates",
    ],
    howToUse: [
      "Set Min and Max bounds",
      "Click 'Generate Numbers'",
      "View and copy the random sequence",
    ],
    faq: [
      {
        q: "Is it suitable for raffles and giveaways?",
        a: "Yes. It uses cryptographic entropy for fair and unbiased selection.",
      },
    ],
    relatedSlugs: ["password-generator", "uuid-generator"],
    config: {
      generatorType: "random-number",
    },
  },
  {
    id: "username-generator",
    slug: "username-generator",
    name: "Username Generator",
    tagline: "Generate creative usernames and handles for startups, games, and social media.",
    description:
      "Brainstorm unique handles, gamer tags, and brand names. Pick from tech, creative, aesthetic, or minimalist categories.",
    category: "Generators",
    categorySlug: "generators",
    template: "generator",
    icon: Wrench,
    iconColor: "text-purple-600",
    bgColor: "bg-purple-50",
    href: "/tools/generators/username-generator",
    inBrowser: true,
    features: [
      "Themes: Tech, Founder, Aesthetic, Minimalist",
      "Option to append random numbers or prefixes",
      "Bulk generation of 10 usernames per click",
    ],
    howToUse: [
      "Choose a theme and prefix preference",
      "Click 'Generate Handles'",
      "Click any username to copy",
    ],
    faq: [
      {
        q: "Are these usernames checked against Twitter or GitHub?",
        a: "They generate suggested handles; click any name to test availability.",
      },
    ],
    relatedSlugs: ["slug-generator", "lorem-ipsum"],
    config: {
      generatorType: "username",
    },
  },
  {
    id: "color-palette",
    slug: "color-palette",
    name: "Color Palette Generator",
    tagline: "Generate harmonic hex color palettes and inspect contrast levels.",
    description:
      "Explore curated color palettes, generate random complementary harmonies, copy hex codes, and export CSS custom properties.",
    category: "Generators",
    categorySlug: "generators",
    template: "generator",
    icon: Palette,
    iconColor: "text-purple-600",
    bgColor: "bg-purple-50",
    href: "/tools/generators/color-palette",
    inBrowser: true,
    features: [
      "5-color harmonious palette generation",
      "One-click hex code copying",
      "Export as CSS variables or Tailwind tokens",
    ],
    howToUse: [
      "Press space or click 'Generate Palette'",
      "Click any color block to copy its hex code",
      "Export palette for your design system",
    ],
    faq: [
      {
        q: "What color harmony schemes are used?",
        a: "It generates monochromatic, analogous, complementary, and triadic color schemes.",
      },
    ],
    relatedSlugs: ["contrast-checker", "html-formatter"],
    config: {
      generatorType: "palette",
    },
  },

  // ──────────────────────────────────────────────────────────────────
  // Image Tools
  // ──────────────────────────────────────────────────────────────────
  {
    id: "compressor",
    slug: "compressor",
    name: "Image Compressor",
    tagline: "Compress PNG, JPG, and WebP images up to 80% without noticeable quality loss.",
    description:
      "Shrink photo file sizes directly in your browser using canvas compression. Reduce WebP, JPEG, and PNG files for websites and email attachments.",
    category: "Image Tools",
    categorySlug: "image",
    template: "image",
    icon: ImageIcon,
    iconColor: "text-amber-600",
    bgColor: "bg-amber-50",
    href: "/tools/image/compressor",
    isPopular: true,
    inBrowser: true,
    features: [
      "Adjustable quality compression slider (10% to 100%)",
      "Real-time file size comparison (Before vs. After)",
      "Supports JPG, PNG, and WebP formats",
      "100% In-browser canvas processing — zero server uploads",
    ],
    howToUse: [
      "Drop or upload an image",
      "Adjust the quality slider to find your desired file size",
      "Inspect the live reduction percentage",
      "Download the compressed image",
    ],
    faq: [
      {
        q: "Will my images be uploaded anywhere?",
        a: "No. The entire compression process happens locally inside your browser via HTML5 Canvas API.",
      },
    ],
    relatedSlugs: ["resizer", "cropper", "jpg-to-png", "png-to-jpg"],
  },
  {
    id: "resizer",
    slug: "resizer",
    name: "Image Resizer",
    tagline: "Resize photos to custom pixel dimensions while preserving aspect ratio.",
    description:
      "Scale image dimensions up or down. Set exact width and height or scale by percentage, with aspect-ratio locking.",
    category: "Image Tools",
    categorySlug: "image",
    template: "image",
    icon: Maximize2,
    iconColor: "text-amber-600",
    bgColor: "bg-amber-50",
    href: "/tools/image/resizer",
    inBrowser: true,
    features: [
      "Custom pixel width and height scaling",
      "Lock aspect ratio toggle",
      "Preset sizes for social media (Instagram, Twitter, LinkedIn)",
    ],
    howToUse: [
      "Upload your photo",
      "Enter new pixel dimensions or percentage",
      "Download the resized image",
    ],
    faq: [
      {
        q: "Does resizing distort image proportions?",
        a: "Keep 'Lock Aspect Ratio' checked to maintain natural proportions.",
      },
    ],
    relatedSlugs: ["compressor", "cropper", "favicon-generator"],
  },
  {
    id: "cropper",
    slug: "cropper",
    name: "Image Cropper",
    tagline: "Crop photos to exact ratios: 1:1 square, 16:9 banner, 4:3, or freeform.",
    description:
      "Trim unwanted borders from images. Crop photos to square profile avatars, YouTube thumbnails, or custom aspect ratios.",
    category: "Image Tools",
    categorySlug: "image",
    template: "image",
    icon: ImageIcon,
    iconColor: "text-amber-600",
    bgColor: "bg-amber-50",
    href: "/tools/image/cropper",
    inBrowser: true,
    features: [
      "Aspect ratio presets: 1:1 (Avatar), 16:9 (Video), 4:3, and Freeform",
      "Visual drag handles for precision positioning",
      "Instant cropped export",
    ],
    howToUse: [
      "Upload image",
      "Drag the crop box over the target area",
      "Click 'Crop & Download'",
    ],
    faq: [
      {
        q: "Can I undo a crop?",
        a: "Yes. The original image remains in memory until you download.",
      },
    ],
    relatedSlugs: ["compressor", "resizer", "favicon-generator"],
  },
  {
    id: "jpg-to-png",
    slug: "jpg-to-png",
    name: "JPG to PNG Converter",
    tagline: "Convert JPEG photos into lossless PNG format with transparent layer support.",
    description:
      "Convert JPG images to PNG format directly in your browser. Eliminates compression artifacts and prepares assets for transparency editing.",
    category: "Image Tools",
    categorySlug: "image",
    template: "image",
    icon: RefreshCw,
    iconColor: "text-amber-600",
    bgColor: "bg-amber-50",
    href: "/tools/image/jpg-to-png",
    inBrowser: true,
    features: [
      "Lossless conversion to PNG format",
      "Retains high resolution",
      "Instant client-side rendering",
    ],
    howToUse: [
      "Upload your JPG photo",
      "Click 'Convert to PNG'",
      "Download your new PNG file",
    ],
    faq: [
      {
        q: "Does converting JPG to PNG improve quality?",
        a: "It prevents further compression loss when re-saving edits.",
      },
    ],
    relatedSlugs: ["png-to-jpg", "compressor", "resizer"],
  },
  {
    id: "png-to-jpg",
    slug: "png-to-jpg",
    name: "PNG to JPG Converter",
    tagline: "Convert bulky PNG files into compact JPEG images with white background fill.",
    description:
      "Transform heavy PNG graphics into lightweight JPG photos with custom background fill colors and quality settings.",
    category: "Image Tools",
    categorySlug: "image",
    template: "image",
    icon: RefreshCw,
    iconColor: "text-amber-600",
    bgColor: "bg-amber-50",
    href: "/tools/image/png-to-jpg",
    inBrowser: true,
    features: [
      "Reduces large PNG file sizes significantly",
      "Custom background fill for transparent areas",
      "Configurable JPEG output quality",
    ],
    howToUse: [
      "Upload PNG file",
      "Set output quality level",
      "Download compressed JPG",
    ],
    faq: [
      {
        q: "What happens to transparent areas?",
        a: "Transparent pixels are rendered with a clean white background.",
      },
    ],
    relatedSlugs: ["jpg-to-png", "compressor", "resizer"],
  },
  {
    id: "exif-viewer",
    slug: "exif-viewer",
    name: "Image Metadata Viewer",
    tagline: "Inspect EXIF data including camera settings, ISO, focal length, and location.",
    description:
      "Read hidden EXIF tags embedded in photo files: camera make/model, aperture, exposure time, focal length, and GPS coordinates.",
    category: "Image Tools",
    categorySlug: "image",
    template: "file-upload",
    icon: Eye,
    iconColor: "text-amber-600",
    bgColor: "bg-amber-50",
    href: "/tools/image/exif-viewer",
    isNew: true,
    inBrowser: true,
    features: [
      "Inspect Camera Model, Shutter Speed, ISO, and Lens Info",
      "Extract GPS location coordinates if present",
      "100% Client-side — private photos never leave your device",
    ],
    howToUse: [
      "Upload any JPEG or TIFF photo",
      "Inspect the detailed metadata table",
      "Copy technical EXIF parameters",
    ],
    faq: [
      {
        q: "Why do some photos have no EXIF data?",
        a: "Messaging apps like WhatsApp and social media strip EXIF tags for privacy.",
      },
    ],
    relatedSlugs: ["compressor", "resizer", "qr-scanner"],
    config: {
      actionName: "Read Metadata",
      accept: ".jpg,.jpeg,.png,.webp,.tiff",
    },
  },
  {
    id: "favicon-generator",
    slug: "favicon-generator",
    name: "Favicon Generator",
    tagline: "Create 16x16, 32x32, and apple-touch-icon assets from any logo image.",
    description:
      "Generate standard website favicons from your logo. Export favicon.ico, 16x16, 32x32 PNGs, and Apple touch icons with ready-to-paste HTML code.",
    category: "Image Tools",
    categorySlug: "image",
    template: "image",
    icon: ImageIcon,
    iconColor: "text-amber-600",
    bgColor: "bg-amber-50",
    href: "/tools/image/favicon-generator",
    inBrowser: true,
    features: [
      "Generates 16x16, 32x32, 180x180 (Apple touch), and 512x512 icons",
      "Provides ready-to-use <link> HTML tags",
      "ZIP download with all icon variants",
    ],
    howToUse: [
      "Upload your brand logo (PNG or SVG recommended)",
      "Preview standard favicon dimensions",
      "Download the complete icon bundle",
    ],
    faq: [
      {
        q: "What size image should I start with?",
        a: "A square image of at least 512x512 pixels works best.",
      },
    ],
    relatedSlugs: ["resizer", "compressor", "cropper"],
  },

  // ──────────────────────────────────────────────────────────────────
  // Text Tools
  // ──────────────────────────────────────────────────────────────────
  {
    id: "word-counter",
    slug: "word-counter",
    name: "Word Counter",
    tagline: "Count words, characters, sentences, paragraphs, and reading time in real time.",
    description:
      "Analyze your written content in real time. Count total words, characters with and without spaces, sentences, paragraphs, and estimated speech/reading times.",
    category: "Text Tools",
    categorySlug: "text",
    template: "editor",
    icon: Type,
    iconColor: "text-emerald-600",
    bgColor: "bg-emerald-50",
    href: "/tools/text/word-counter",
    isPopular: true,
    inBrowser: true,
    features: [
      "Live word and character count updates on every keystroke",
      "Estimated reading time (based on 200 WPM) and speaking time",
      "Paragraph and sentence structure metrics",
      "Keyword density and word frequency overview",
    ],
    howToUse: [
      "Type or paste your text into the editor",
      "Review the metrics dashboard at the top of the workspace",
      "Inspect word density and character breakdowns",
    ],
    faq: [
      {
        q: "How is reading time calculated?",
        a: "It uses the standard adult reading pace of 200 words per minute.",
      },
    ],
    relatedSlugs: ["character-counter", "case-converter", "text-cleaner", "markdown-previewer"],
    config: {
      editorMode: "word-counter",
      defaultSample: `ToolBox Hub is an all-in-one free browser utility platform built for developers, founders, and creators. No accounts, no paywalls, 100% privacy.`,
    },
  },
  {
    id: "character-counter",
    slug: "character-counter",
    name: "Character Counter",
    tagline: "Track character counts for Twitter, LinkedIn, SMS, and SEO meta tags.",
    description:
      "Check character limits for social media platforms: Twitter (280), SMS (160), Meta title (60), and Meta description (160).",
    category: "Text Tools",
    categorySlug: "text",
    template: "editor",
    icon: Type,
    iconColor: "text-emerald-600",
    bgColor: "bg-emerald-50",
    href: "/tools/text/character-counter",
    inBrowser: true,
    features: [
      "Limit trackers for X/Twitter (280), Meta Title (60), Meta Desc (160)",
      "Counts characters with and without whitespace",
      "Alerts when content exceeds maximum platform limits",
    ],
    howToUse: [
      "Paste your text or post draft",
      "Check the platform progress bars",
      "Refine copy until limits are green",
    ],
    faq: [
      {
        q: "Does this count emojis as one or two characters?",
        a: "Standard emoji characters are properly counted following Unicode surrogate pair rules.",
      },
    ],
    relatedSlugs: ["word-counter", "case-converter", "slug-generator"],
    config: {
      editorMode: "character-counter",
      defaultSample: `Write crisp copy that fits within platform character constraints.`,
    },
  },
  {
    id: "case-converter",
    slug: "case-converter",
    name: "Case Converter",
    tagline: "Convert text between camelCase, PascalCase, snake_case, kebab-case, and UPPER.",
    description:
      "Transform text strings between programming conventions and typographical cases: UPPERCASE, lowercase, Title Case, Sentence case, camelCase, snake_case, and kebab-case.",
    category: "Text Tools",
    categorySlug: "text",
    template: "editor",
    icon: Type,
    iconColor: "text-emerald-600",
    bgColor: "bg-emerald-50",
    href: "/tools/text/case-converter",
    inBrowser: true,
    features: [
      "Supports 8 cases: UPPER, lower, Title, Sentence, camelCase, snake_case, kebab-case, CONSTANT_CASE",
      "Instant transformation with one click",
      "Copy formatted text immediately",
    ],
    howToUse: [
      "Type or paste text into the input panel",
      "Click any case button (e.g. 'camelCase', 'snake_case', 'UPPERCASE')",
      "Copy the result",
    ],
    faq: [
      {
        q: "What is kebab-case used for?",
        a: "kebab-case is widely used for URL slugs, CSS class names, and Git branch names.",
      },
    ],
    relatedSlugs: ["slug-generator", "text-cleaner", "word-counter"],
    config: {
      editorMode: "case-converter",
      defaultSample: `hello world developer tools platform`,
    },
  },
  {
    id: "text-cleaner",
    slug: "text-cleaner",
    name: "Text Cleaner & Normalizer",
    tagline: "Strip duplicate lines, excess whitespace, non-ASCII symbols, and blank rows.",
    description:
      "Clean up messy copied text. Remove redundant blank lines, trim extra spaces, strip HTML tags, remove duplicate lines, and sort rows alphabetically.",
    category: "Text Tools",
    categorySlug: "text",
    template: "editor",
    icon: Wrench,
    iconColor: "text-emerald-600",
    bgColor: "bg-emerald-50",
    href: "/tools/text/text-cleaner",
    inBrowser: true,
    features: [
      "Remove duplicate lines automatically",
      "Collapse multiple spaces into single spaces",
      "Strip HTML tags and formatting entities",
      "Sort lines alphabetically or reverse",
    ],
    howToUse: [
      "Paste text into the editor",
      "Select cleaning actions (e.g. 'Remove Duplicates', 'Trim Spaces')",
      "Copy the sanitized text",
    ],
    faq: [
      {
        q: "Does this affect tab indentation?",
        a: "You can choose whether to trim only spaces or all whitespace characters.",
      },
    ],
    relatedSlugs: ["diff-checker", "case-converter", "word-counter"],
    config: {
      editorMode: "text-cleaner",
      defaultSample: `apple\nbanana\napple\norange\n  banana  \n\n\ngrape`,
    },
  },
  {
    id: "diff-checker",
    slug: "diff-checker",
    name: "Text Diff Checker",
    tagline: "Compare two text snippets side-by-side to find additions, deletions, and edits.",
    description:
      "Compare two blocks of code or prose side-by-side. Highlights additions in green and deletions in red with exact character-level diff accuracy.",
    category: "Text Tools",
    categorySlug: "text",
    template: "editor",
    icon: RefreshCw,
    iconColor: "text-emerald-600",
    bgColor: "bg-emerald-50",
    href: "/tools/text/diff-checker",
    isNew: true,
    inBrowser: true,
    features: [
      "Side-by-side split visual diff inspection",
      "Green highlights for insertions, red for removals",
      "Line numbers and change statistics",
    ],
    howToUse: [
      "Paste the original text into Panel 1",
      "Paste the modified text into Panel 2",
      "Review the highlighted differences and stats",
    ],
    faq: [
      {
        q: "Can I compare code files?",
        a: "Yes. It supports code, configuration files, and standard prose.",
      },
    ],
    relatedSlugs: ["text-cleaner", "markdown-previewer", "json-formatter"],
    config: {
      editorMode: "diff",
      defaultSample: `The quick brown fox jumps over the lazy dog.`,
      defaultSample2: `The fast brown fox leaped over the sleepy dog.`,
    },
  },
  {
    id: "slug-generator",
    slug: "slug-generator",
    name: "URL Slug Generator",
    tagline: "Turn article titles or headlines into SEO-friendly, clean URL slugs.",
    description:
      "Transform blog headlines and product titles into clean, URL-safe slugs. Strips punctuation, handles Unicode transliteration, and joins words with hyphens.",
    category: "Text Tools",
    categorySlug: "text",
    template: "editor",
    icon: Globe,
    iconColor: "text-emerald-600",
    bgColor: "bg-emerald-50",
    href: "/tools/text/slug-generator",
    inBrowser: true,
    features: [
      "Strips emojis, punctuation, and illegal URI symbols",
      "Converts spaces into clean hyphens",
      "Custom separator selection (hyphen or underscore)",
    ],
    howToUse: [
      "Type or paste your headline",
      "Click 'Generate Slug'",
      "Copy the clean URL path",
    ],
    faq: [
      {
        q: "Is the slug lowercase by default?",
        a: "Yes. Search engines recommend lowercase alphanumeric slugs.",
      },
    ],
    relatedSlugs: ["case-converter", "url-encoder", "word-counter"],
    config: {
      editorMode: "slug",
      defaultSample: `10 Best Free Developer Tools in 2026!`,
    },
  },
  {
    id: "markdown-previewer",
    slug: "markdown-previewer",
    name: "Markdown Previewer",
    tagline: "Live side-by-side GitHub Flavored Markdown editor with HTML export.",
    description:
      "Write and preview GitHub Flavored Markdown in real time. Supports code blocks, tables, task lists, blockquotes, and exports rendered HTML.",
    category: "Text Tools",
    categorySlug: "text",
    template: "editor",
    icon: FileCode,
    iconColor: "text-emerald-600",
    bgColor: "bg-emerald-50",
    href: "/tools/text/markdown-previewer",
    isNew: true,
    inBrowser: true,
    features: [
      "Real-time split editor and rendered HTML preview",
      "Supports GFM tables, strikethrough, checklists, and code fences",
      "One-click copy rendered HTML or download as .md",
    ],
    howToUse: [
      "Write Markdown on the left panel",
      "Inspect formatted preview on the right",
      "Export as Markdown or raw HTML",
    ],
    faq: [
      {
        q: "Does it support tables and code highlighting?",
        a: "Yes. Full GitHub Flavored Markdown specification is supported.",
      },
    ],
    relatedSlugs: ["html-formatter", "word-counter", "diff-checker"],
    config: {
      editorMode: "markdown",
      defaultSample: `# ToolBox Hub\n\n- [x] Fast in-browser execution\n- [x] Zero accounts required\n- [x] 100% Client-side privacy\n\n| Feature | Status |\n|---|---|\n| Free | Yes |\n| Private | Yes |`,
    },
  },

  // ──────────────────────────────────────────────────────────────────
  // Converters
  // ──────────────────────────────────────────────────────────────────
  {
    id: "unit-converter",
    slug: "unit-converter",
    name: "Unit Converter",
    tagline: "Convert between metric and imperial units for length, mass, volume, and speed.",
    description:
      "Convert measurements across international systems: meters to feet, kilograms to pounds, liters to gallons, and kilometers per hour to miles per hour.",
    category: "Converters",
    categorySlug: "converters",
    template: "calculator",
    icon: RefreshCw,
    iconColor: "text-cyan-600",
    bgColor: "bg-cyan-50",
    href: "/tools/converters/unit-converter",
    inBrowser: true,
    features: [
      "Categories: Length, Weight, Volume, Speed, and Area",
      "Bidirectional conversion with live calculation",
      "High precision decimal accuracy",
    ],
    howToUse: [
      "Select unit category (e.g. Length)",
      "Choose from unit and to unit",
      "Enter amount to see instant conversion",
    ],
    faq: [
      {
        q: "Are conversions exact?",
        a: "Yes. They use international standard conversion coefficients.",
      },
    ],
    relatedSlugs: ["currency-converter", "temperature-converter", "data-size-converter"],
    config: {
      calcType: "unit",
    },
  },
  {
    id: "currency-converter",
    slug: "currency-converter",
    name: "Currency Converter",
    tagline: "Real-time foreign exchange conversions across USD, EUR, GBP, JPY, and INR.",
    description:
      "Convert values between world currencies using benchmark exchange rates. Calculate conversions across USD, EUR, GBP, JPY, CAD, AUD, and INR.",
    category: "Converters",
    categorySlug: "converters",
    template: "calculator",
    icon: Calculator,
    iconColor: "text-cyan-600",
    bgColor: "bg-cyan-50",
    href: "/tools/converters/currency-converter",
    inBrowser: true,
    features: [
      "Supports major global currencies: USD, EUR, GBP, JPY, CAD, AUD, INR",
      "Live conversion calculation with inverse exchange rates",
      "Quick amount buttons ($10, $50, $100, $500, $1,000)",
    ],
    howToUse: [
      "Enter amount",
      "Select base currency and target currency",
      "View converted amount and conversion rate",
    ],
    faq: [
      {
        q: "How often are rates updated?",
        a: "Rates are calibrated regularly against international central bank benchmarks.",
      },
    ],
    relatedSlugs: ["unit-converter", "gst-calculator", "percentage-calculator"],
    config: {
      calcType: "currency",
    },
  },
  {
    id: "temperature-converter",
    slug: "temperature-converter",
    name: "Temperature Converter",
    tagline: "Convert temperatures between Celsius, Fahrenheit, and Kelvin scales.",
    description:
      "Accurately calculate temperature conversions across Celsius (°C), Fahrenheit (°F), and scientific Kelvin (K) scales with step-by-step formulas.",
    category: "Converters",
    categorySlug: "converters",
    template: "calculator",
    icon: RefreshCw,
    iconColor: "text-cyan-600",
    bgColor: "bg-cyan-50",
    href: "/tools/converters/temperature-converter",
    inBrowser: true,
    features: [
      "Simultaneous conversion across °C, °F, and K",
      "Displays conversion formulas (e.g., °F = (°C × 9/5) + 32)",
      "Instant real-time computation",
    ],
    howToUse: [
      "Enter temperature value",
      "Select scale",
      "Inspect converted values across all scales",
    ],
    faq: [
      {
        q: "What is absolute zero?",
        a: "Absolute zero is 0 K, which equals -273.15 °C or -459.67 °F.",
      },
    ],
    relatedSlugs: ["unit-converter", "time-converter", "data-size-converter"],
    config: {
      calcType: "temperature",
    },
  },
  {
    id: "time-converter",
    slug: "time-converter",
    name: "Time Unit Converter",
    tagline: "Convert time across seconds, minutes, hours, days, weeks, and years.",
    description:
      "Calculate time durations across milliseconds, seconds, minutes, hours, days, weeks, months, and years.",
    category: "Converters",
    categorySlug: "converters",
    template: "calculator",
    icon: Clock,
    iconColor: "text-cyan-600",
    bgColor: "bg-cyan-50",
    href: "/tools/converters/time-converter",
    inBrowser: true,
    features: [
      "Converts from milliseconds up to centuries",
      "Breakdown into days, hours, minutes, and seconds",
      "Precise decimal handling",
    ],
    howToUse: [
      "Enter duration",
      "Select unit",
      "Inspect full converted duration breakdown",
    ],
    faq: [
      {
        q: "How many seconds are in a day?",
        a: "There are exactly 86,400 seconds in a 24-hour day.",
      },
    ],
    relatedSlugs: ["timestamp-converter", "age-calculator", "unit-converter"],
    config: {
      calcType: "time",
    },
  },
  {
    id: "data-size-converter",
    slug: "data-size-converter",
    name: "Data Size Converter",
    tagline: "Convert storage sizes between Bytes, KB, MB, GB, TB, and Petabytes.",
    description:
      "Convert digital storage units between decimal SI (1,000 bytes) and binary IEC (1,024 bytes) standards: Bytes, Kilobytes, Megabytes, Gigabytes, and Terabytes.",
    category: "Converters",
    categorySlug: "converters",
    template: "calculator",
    icon: Calculator,
    iconColor: "text-cyan-600",
    bgColor: "bg-cyan-50",
    href: "/tools/converters/data-size-converter",
    inBrowser: true,
    features: [
      "Supports Decimal (1,000 bytes) and Binary (1,024 bytes) modes",
      "Units from Bytes up to Petabytes",
      "Download transfer speed calculations",
    ],
    howToUse: [
      "Enter data amount",
      "Select input unit (e.g. GB)",
      "View converted sizes in MB, TB, and Bytes",
    ],
    faq: [
      {
        q: "What is the difference between MB and MiB?",
        a: "1 MB is 1,000,000 bytes (decimal standard), while 1 MiB is 1,048,576 bytes (binary standard).",
      },
    ],
    relatedSlugs: ["unit-converter", "timestamp-converter"],
    config: {
      calcType: "data-size",
    },
  },

  // ──────────────────────────────────────────────────────────────────
  // Calculators
  // ──────────────────────────────────────────────────────────────────
  {
    id: "percentage-calculator",
    slug: "percentage-calculator",
    name: "Percentage Calculator",
    tagline: "Calculate percentage increases, discounts, fractions, and differences.",
    description:
      "Calculate percentages quickly: What is X% of Y? What percentage is X of Y? Calculate percentage increases, reductions, and margins with ease.",
    category: "Calculators",
    categorySlug: "calc",
    template: "calculator",
    icon: Calculator,
    iconColor: "text-indigo-600",
    bgColor: "bg-indigo-50",
    href: "/tools/calc/percentage-calculator",
    inBrowser: true,
    features: [
      "Three calculation modes: Value percentage, Fraction to %, and Increase/Decrease %",
      "Step-by-step formula breakdown shown",
      "Instant updates as you type numbers",
    ],
    howToUse: [
      "Choose calculation type",
      "Enter the numbers into the input boxes",
      "View the calculated result and percentage formula",
    ],
    faq: [
      {
        q: "How do you calculate percentage increase?",
        a: "Subtract old value from new value, divide by old value, and multiply by 100.",
      },
    ],
    relatedSlugs: ["gst-calculator", "discount-calculator", "profit-margin-calculator"],
    config: {
      calcType: "percentage",
    },
  },
  {
    id: "gst-calculator",
    slug: "gst-calculator",
    name: "GST & VAT Calculator",
    tagline: "Calculate inclusive and exclusive goods and services tax on transactions.",
    description:
      "Calculate GST and VAT for business invoices. Toggle between GST Inclusive (reverse tax) and GST Exclusive (add tax), and view CGST and SGST breakdowns.",
    category: "Calculators",
    categorySlug: "calc",
    template: "calculator",
    icon: Calculator,
    iconColor: "text-indigo-600",
    bgColor: "bg-indigo-50",
    href: "/tools/calc/gst-calculator",
    inBrowser: true,
    features: [
      "Preset tax rates (5%, 12%, 18%, 28%) + custom rate entry",
      "GST Inclusive vs. GST Exclusive toggle",
      "Breakdown of Net Amount, Total Tax, and Gross Total",
    ],
    howToUse: [
      "Enter transaction amount",
      "Select GST rate percentage",
      "Choose GST Inclusive or Exclusive mode",
      "Review the tax breakdown summary",
    ],
    faq: [
      {
        q: "What is GST Inclusive?",
        a: "GST Inclusive means the tax amount is already factored into the final retail price.",
      },
    ],
    relatedSlugs: ["invoice-generator", "percentage-calculator", "profit-margin-calculator"],
    config: {
      calcType: "gst",
    },
  },
  {
    id: "age-calculator",
    slug: "age-calculator",
    name: "Age Calculator",
    tagline: "Calculate exact age in years, months, days, hours, and next birthday countdown.",
    description:
      "Calculate exact age from date of birth. See your age broken down into years, months, weeks, days, hours, and countdown to your next birthday.",
    category: "Calculators",
    categorySlug: "calc",
    template: "calculator",
    icon: Clock,
    iconColor: "text-indigo-600",
    bgColor: "bg-indigo-50",
    href: "/tools/calc/age-calculator",
    inBrowser: true,
    features: [
      "Exact breakdown in years, months, and days",
      "Total lived days, hours, and minutes calculation",
      "Countdown timer to upcoming birthday",
    ],
    howToUse: [
      "Select your Date of Birth",
      "Inspect your exact age breakdown",
      "See days remaining until next birthday",
    ],
    faq: [
      {
        q: "Does this account for leap years?",
        a: "Yes. Leap years (Feb 29) are calculated accurately.",
      },
    ],
    relatedSlugs: ["bmi-calculator", "time-converter", "timestamp-converter"],
    config: {
      calcType: "age",
    },
  },
  {
    id: "bmi-calculator",
    slug: "bmi-calculator",
    name: "BMI Calculator",
    tagline: "Calculate Body Mass Index and healthy weight ranges for adults.",
    description:
      "Calculate your Body Mass Index (BMI). Supports metric (cm/kg) and imperial (ft/in/lbs) units, with official WHO health classification categories.",
    category: "Calculators",
    categorySlug: "calc",
    template: "calculator",
    icon: Calculator,
    iconColor: "text-indigo-600",
    bgColor: "bg-indigo-50",
    href: "/tools/calc/bmi-calculator",
    inBrowser: true,
    features: [
      "Metric (cm/kg) and Imperial (feet/inches/pounds) toggling",
      "WHO Category markers: Underweight, Normal, Overweight, Obese",
      "Calculates ideal healthy weight range for your height",
    ],
    howToUse: [
      "Enter your height and weight",
      "Select unit system",
      "Review your BMI score and health category",
    ],
    faq: [
      {
        q: "What is considered a normal BMI?",
        a: "A BMI between 18.5 and 24.9 is considered normal weight by WHO.",
      },
    ],
    relatedSlugs: ["age-calculator", "percentage-calculator"],
    config: {
      calcType: "bmi",
    },
  },
  {
    id: "discount-calculator",
    slug: "discount-calculator",
    name: "Discount Calculator",
    tagline: "Calculate sale prices, percentage discounts, coupons, and total savings.",
    description:
      "Find the final price after retail discounts and store coupons. Calculate exact dollar savings and tax impacts.",
    category: "Calculators",
    categorySlug: "calc",
    template: "calculator",
    icon: Calculator,
    iconColor: "text-indigo-600",
    bgColor: "bg-indigo-50",
    href: "/tools/calc/discount-calculator",
    inBrowser: true,
    features: [
      "Original price, discount %, and additional coupon % fields",
      "Displays final price and total saved amount",
      "Quick discount buttons (10%, 20%, 30%, 50%)",
    ],
    howToUse: [
      "Enter original price",
      "Enter discount percentage",
      "View final price and total savings",
    ],
    faq: [
      {
        q: "Can I apply two discounts in succession?",
        a: "Yes. Use the additional coupon field to model stacked promotions.",
      },
    ],
    relatedSlugs: ["percentage-calculator", "gst-calculator", "profit-margin-calculator"],
    config: {
      calcType: "discount",
    },
  },
  {
    id: "loan-calculator",
    slug: "loan-calculator",
    name: "Loan & EMI Calculator",
    tagline: "Calculate monthly EMI, total interest, and loan amortization breakdown.",
    description:
      "Calculate monthly loan payments (EMI) for mortgages, auto loans, or personal debt. View total interest payable and loan cost breakdown.",
    category: "Calculators",
    categorySlug: "calc",
    template: "calculator",
    icon: Calculator,
    iconColor: "text-indigo-600",
    bgColor: "bg-indigo-50",
    href: "/tools/calc/loan-calculator",
    inBrowser: true,
    features: [
      "Calculate Monthly Payment (EMI), Total Interest, and Total Cost",
      "Adjustable loan term (years or months)",
      "Visual breakdown chart of Principal vs. Interest",
    ],
    howToUse: [
      "Enter loan amount",
      "Enter annual interest rate percentage",
      "Enter loan term duration in years",
      "Inspect the monthly payment and total interest summary",
    ],
    faq: [
      {
        q: "Does this use fixed or reducing interest?",
        a: "It uses standard reducing-balance amortization used by commercial banks.",
      },
    ],
    relatedSlugs: ["runway-calculator", "profit-margin-calculator", "percentage-calculator"],
    config: {
      calcType: "loan",
    },
  },
  {
    id: "profit-margin-calculator",
    slug: "profit-margin-calculator",
    name: "Profit Margin Calculator",
    tagline: "Calculate gross margin %, markup %, and gross profit from cost and revenue.",
    description:
      "Calculate business profit margins. Enter cost and revenue to determine gross profit, profit margin percentage, and markup percentage.",
    category: "Calculators",
    categorySlug: "calc",
    template: "calculator",
    icon: TrendingUp,
    iconColor: "text-indigo-600",
    bgColor: "bg-indigo-50",
    href: "/tools/calc/profit-margin-calculator",
    inBrowser: true,
    features: [
      "Calculates Profit Margin % and Markup % simultaneously",
      "Gross profit dollar amount display",
      "Reverse calculation: target margin to required selling price",
    ],
    howToUse: [
      "Enter cost of goods (COGS)",
      "Enter selling price or target margin percentage",
      "View calculated profit, margin %, and markup %",
    ],
    faq: [
      {
        q: "What is the difference between margin and markup?",
        a: "Margin is profit divided by revenue; markup is profit divided by cost.",
      },
    ],
    relatedSlugs: ["runway-calculator", "gst-calculator", "invoice-generator"],
    config: {
      calcType: "margin",
    },
  },

  // ──────────────────────────────────────────────────────────────────
  // Business Tools
  // ──────────────────────────────────────────────────────────────────
  {
    id: "invoice-generator",
    slug: "invoice-generator",
    name: "Invoice Generator",
    tagline: "Create professional PDF invoices with custom items, taxes, and instant download.",
    description:
      "Generate clean, professional invoices for clients and freelance contracts. Add line items, tax rates, payment instructions, and export as PDF.",
    category: "Business Tools",
    categorySlug: "business",
    template: "calculator",
    icon: Briefcase,
    iconColor: "text-sky-600",
    bgColor: "bg-sky-50",
    href: "/tools/business/invoice-generator",
    inBrowser: true,
    features: [
      "Add unlimited line items with quantity, rate, and descriptions",
      "Configurable tax, discount, and currency symbol",
      "Custom business logo, bill-to, and payment terms",
      "Instant PDF generation without signup",
    ],
    howToUse: [
      "Fill in your business details and client information",
      "Add billing line items with rates and quantities",
      "Set applicable tax rates and payment notes",
      "Download your professional PDF invoice",
    ],
    faq: [
      {
        q: "Can I save invoice templates?",
        a: "Your browser caches your business information locally for fast reuse.",
      },
    ],
    relatedSlugs: ["runway-calculator", "gst-calculator", "profit-margin-calculator"],
    config: {
      calcType: "invoice",
    },
  },
  {
    id: "runway-calculator",
    slug: "runway-calculator",
    name: "Startup Runway Calculator",
    tagline: "Model cash burn, headcount growth, and runway depletion in months.",
    description:
      "Calculate your company's cash runway. Enter current bank balance, monthly gross burn, and revenue to model survival timeline and forecast funding milestones.",
    category: "Business Tools",
    categorySlug: "business",
    template: "calculator",
    icon: TrendingUp,
    iconColor: "text-sky-600",
    bgColor: "bg-sky-50",
    href: "/tools/business/runway-calculator",
    inBrowser: true,
    features: [
      "Calculates net burn rate and exact runway in months",
      "Projected zero-cash date calendar calculation",
      "Headcount growth and expansion simulation",
      "100% private — financial metrics stay strictly on your device",
    ],
    howToUse: [
      "Enter current cash balance",
      "Enter monthly expenses (gross burn)",
      "Enter monthly recurring revenue (MRR)",
      "Inspect runway months and projected zero-cash date",
    ],
    faq: [
      {
        q: "What is net burn versus gross burn?",
        a: "Gross burn is your total monthly spend; net burn is gross burn minus monthly revenue.",
      },
    ],
    relatedSlugs: ["invoice-generator", "profit-margin-calculator", "loan-calculator"],
    config: {
      calcType: "runway",
    },
  },
];

// ── Lookup Helpers ──────────────────────────────────────────────────
export function getToolBySlug(category: string, slug: string): MarketplaceTool | undefined {
  const normCategory = category.toLowerCase().trim();
  const normSlug = slug.toLowerCase().trim();

  // 1. Direct match by categorySlug and slug
  let found = ALL_TOOLS.find(
    (t) => t.categorySlug === normCategory && t.slug === normSlug
  );
  if (found) return found;

  // 2. Direct match by slug regardless of category (handles aliases / canonical routing)
  found = ALL_TOOLS.find((t) => t.slug === normSlug);
  if (found) return found;

  // 3. Fallback: match by id
  found = ALL_TOOLS.find((t) => t.id === normSlug);
  if (found) return found;

  return undefined;
}

export function getRelatedTools(tool: MarketplaceTool, count: number = 4): MarketplaceTool[] {
  // First prefer explicit relatedSlugs
  if (tool.relatedSlugs && tool.relatedSlugs.length > 0) {
    const list = tool.relatedSlugs
      .map((s) => ALL_TOOLS.find((t) => t.slug === s || t.id === s))
      .filter((t): t is MarketplaceTool => !!t && t.id !== tool.id);
    if (list.length >= count) return list.slice(0, count);
  }

  // Fallback to same category tools
  const sameCat = ALL_TOOLS.filter(
    (t) => t.categorySlug === tool.categorySlug && t.id !== tool.id
  );
  return sameCat.slice(0, count);
}

export function getAllMarketplaceTools(): MarketplaceTool[] {
  return ALL_TOOLS;
}
