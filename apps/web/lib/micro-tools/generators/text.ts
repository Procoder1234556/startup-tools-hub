import type { MicroToolDef } from "../types";

export type TextTransformFn = (input: string) => string;

const transforms: { id: string; name: string; description: string; fn: TextTransformFn }[] = [
  { id: "reverse", name: "Reverse Text", description: "Reverse character order in any string.", fn: (s) => [...s].reverse().join("") },
  { id: "uppercase", name: "Uppercase", description: "Convert text to ALL UPPERCASE.", fn: (s) => s.toUpperCase() },
  { id: "lowercase", name: "Lowercase", description: "Convert text to all lowercase.", fn: (s) => s.toLowerCase() },
  { id: "title-case", name: "Title Case", description: "Capitalize the first letter of each word.", fn: titleCase },
  { id: "sentence-case", name: "Sentence case", description: "Capitalize the first letter of each sentence.", fn: sentenceCase },
  { id: "trim", name: "Trim whitespace", description: "Remove leading and trailing whitespace.", fn: (s) => s.trim() },
  { id: "collapse-spaces", name: "Collapse spaces", description: "Replace multiple spaces with a single space.", fn: (s) => s.replace(/\s+/g, " ").trim() },
  { id: "remove-spaces", name: "Remove all spaces", description: "Delete every space character.", fn: (s) => s.replace(/\s/g, "") },
  { id: "remove-line-breaks", name: "Remove line breaks", description: "Join lines into one paragraph.", fn: (s) => s.replace(/\r?\n/g, " ") },
  { id: "sort-lines-asc", name: "Sort lines (A→Z)", description: "Sort lines alphabetically ascending.", fn: (s) => s.split(/\r?\n/).sort((a, b) => a.localeCompare(b)).join("\n") },
  { id: "sort-lines-desc", name: "Sort lines (Z→A)", description: "Sort lines alphabetically descending.", fn: (s) => s.split(/\r?\n/).sort((a, b) => b.localeCompare(a)).join("\n") },
  { id: "unique-lines", name: "Unique lines", description: "Remove duplicate lines while preserving first occurrence order.", fn: uniqueLines },
  { id: "rot13", name: "ROT13", description: "Apply ROT13 cipher to letters.", fn: rot13 },
  { id: "slugify", name: "Slugify", description: "Create URL-friendly slugs from text.", fn: slugify },
  { id: "camel-case", name: "camelCase", description: "Convert words to camelCase.", fn: toCamelCase },
  { id: "snake-case", name: "snake_case", description: "Convert words to snake_case.", fn: toSnakeCase },
  { id: "kebab-case", name: "kebab-case", description: "Convert words to kebab-case.", fn: toKebabCase },
  { id: "pascal-case", name: "PascalCase", description: "Convert words to PascalCase.", fn: toPascalCase },
  { id: "remove-punctuation", name: "Remove punctuation", description: "Strip punctuation characters.", fn: (s) => s.replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ") },
  { id: "extract-digits", name: "Extract digits", description: "Keep only numeric digits from input.", fn: (s) => s.replace(/\D/g, "") },
  { id: "extract-letters", name: "Extract letters", description: "Keep only alphabetic characters.", fn: (s) => s.replace(/[^a-zA-Z]/g, "") },
  { id: "word-count", name: "Word count", description: "Count words in the text.", fn: (s) => String(countWords(s)) },
  { id: "char-count", name: "Character count", description: "Count characters including spaces.", fn: (s) => String(s.length) },
  { id: "line-count", name: "Line count", description: "Count lines in the text.", fn: (s) => String(s.split(/\r?\n/).length) },
  { id: "base64-encode", name: "Text to Base64", description: "UTF-8 encode text to Base64.", fn: utf8ToBase64 },
  { id: "base64-decode", name: "Base64 to text", description: "Decode Base64 to UTF-8 text.", fn: base64ToUtf8 },
  { id: "url-encode", name: "URL encode", description: "Percent-encode text for URLs.", fn: (s) => encodeURIComponent(s) },
  { id: "url-decode", name: "URL decode", description: "Decode percent-encoded URL text.", fn: safeUrlDecode },
  { id: "html-encode", name: "HTML encode", description: "Escape HTML special characters.", fn: htmlEncode },
  { id: "html-decode", name: "HTML decode", description: "Unescape common HTML entities.", fn: htmlDecode },
  { id: "binary-encode", name: "Text to binary", description: "Encode UTF-8 text as space-separated bytes.", fn: textToBinary },
  { id: "binary-decode", name: "Binary to text", description: "Decode space-separated binary bytes to text.", fn: binaryToText },
  { id: "hex-encode", name: "Text to hex", description: "Encode UTF-8 bytes as hexadecimal.", fn: textToHex },
  { id: "hex-decode", name: "Hex to text", description: "Decode hexadecimal to UTF-8 text.", fn: hexToText },
  { id: "repeat", name: "Repeat text", description: "Repeat input twice.", fn: (s) => s + s },
  { id: "mirror", name: "Mirror text", description: "Append reversed copy (mirror string).", fn: (s) => s + [...s].reverse().join("") },
  { id: "shuffle", name: "Shuffle characters", description: "Randomly shuffle characters (non-crypto).", fn: shuffleChars },
  { id: "invert-case", name: "Invert case", description: "Swap upper and lower case letters.", fn: invertCase },
  { id: "remove-duplicates-chars", name: "Unique characters", description: "Keep first occurrence of each character.", fn: uniqueChars },
  { id: "add-line-numbers", name: "Add line numbers", description: "Prefix each line with line number.", fn: addLineNumbers },
  { id: "remove-line-numbers", name: "Remove line numbers", description: "Strip leading numeric prefixes from lines.", fn: removeLineNumbers },
];

function titleCase(s: string) {
  return s.replace(/\w\S*/g, (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());
}

function sentenceCase(s: string) {
  return s.replace(/(^\s*\w|[.!?]\s+\w)/g, (c) => c.toUpperCase());
}

function uniqueLines(s: string) {
  const seen = new Set<string>();
  return s
    .split(/\r?\n/)
    .filter((line) => {
      if (seen.has(line)) return false;
      seen.add(line);
      return true;
    })
    .join("\n");
}

function rot13(s: string) {
  return s.replace(/[a-zA-Z]/g, (c) => {
    const base = c <= "Z" ? 65 : 97;
    return String.fromCharCode(((c.charCodeAt(0) - base + 13) % 26) + base);
  });
}

function slugify(s: string) {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function words(s: string) {
  return s.trim().split(/\s+/).filter(Boolean);
}

function countWords(s: string) {
  if (!s.trim()) return 0;
  return words(s).length;
}

function toCamelCase(s: string) {
  const p = words(s.replace(/[_-]/g, " "));
  return p.map((w, i) => (i === 0 ? w.toLowerCase() : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())).join("");
}

function toSnakeCase(s: string) {
  return words(s.replace(/[_-]/g, " "))
    .map((w) => w.toLowerCase())
    .join("_");
}

function toKebabCase(s: string) {
  return words(s.replace(/[_-]/g, " "))
    .map((w) => w.toLowerCase())
    .join("-");
}

function toPascalCase(s: string) {
  return words(s.replace(/[_-]/g, " "))
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join("");
}

function utf8ToBase64(s: string) {
  try {
    const bytes = new TextEncoder().encode(s);
    let binary = "";
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    return btoa(binary);
  } catch {
    return "";
  }
}

function base64ToUtf8(s: string) {
  try {
    const binary = atob(s.trim());
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    return new TextDecoder("utf-8", { fatal: false }).decode(bytes);
  } catch {
    return "Invalid Base64";
  }
}

function safeUrlDecode(s: string) {
  try {
    return decodeURIComponent(s);
  } catch {
    return "Invalid encoded string";
  }
}

function htmlEncode(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function htmlDecode(s: string) {
  return s
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
}

function textToBinary(s: string) {
  const bytes = new TextEncoder().encode(s);
  return [...bytes].map((b) => b.toString(2).padStart(8, "0")).join(" ");
}

function binaryToText(s: string) {
  try {
    const parts = s.trim().split(/\s+/);
    const bytes = new Uint8Array(parts.map((p) => parseInt(p, 2)));
    return new TextDecoder("utf-8", { fatal: false }).decode(bytes);
  } catch {
    return "Invalid binary";
  }
}

function textToHex(s: string) {
  return [...new TextEncoder().encode(s)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

function hexToText(s: string) {
  try {
    const clean = s.replace(/\s/g, "");
    const bytes = new Uint8Array(clean.match(/.{1,2}/g)?.map((h) => parseInt(h, 16)) ?? []);
    return new TextDecoder("utf-8", { fatal: false }).decode(bytes);
  } catch {
    return "Invalid hex";
  }
}

function shuffleChars(s: string) {
  const arr = [...s];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.join("");
}

function invertCase(s: string) {
  return s.replace(/[a-zA-Z]/g, (c) => (c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()));
}

function uniqueChars(s: string) {
  const seen = new Set<string>();
  let out = "";
  for (const c of s) {
    if (!seen.has(c)) {
      seen.add(c);
      out += c;
    }
  }
  return out;
}

function addLineNumbers(s: string) {
  return s
    .split(/\r?\n/)
    .map((line, i) => `${i + 1}. ${line}`)
    .join("\n");
}

function removeLineNumbers(s: string) {
  return s
    .split(/\r?\n/)
    .map((line) => line.replace(/^\s*\d+[\.)]\s*/, ""))
    .join("\n");
}

export const TEXT_TRANSFORM_FNS: Record<string, TextTransformFn> = Object.fromEntries(
  transforms.map((t) => [t.id, t.fn])
);

export function generateTextMicroTools(): MicroToolDef[] {
  return transforms.map((t) => ({
    slug: `text-${t.id}`,
    name: t.name,
    description: t.description,
    category: "text" as const,
    kind: "text-transform" as const,
    iconColor: "text-emerald-600",
    textTransform: { transformId: t.id, label: t.name },
  }));
}
