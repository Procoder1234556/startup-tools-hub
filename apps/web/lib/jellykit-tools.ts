// ponytail: Deliberate static catalog ceiling for 500+ Jellykit tools. Upgrade path: extract individual WASM/Worker runtimes.
import type { CategoryId } from "./categories";

export interface JellykitTool {
  slug: string;
  name: string;
  description: string;
  category: CategoryId;
  available: boolean;
  comingSoon?: boolean;
  iconColor: string;
  jellykit: true;
  sourceCategory?: string;
}

export const JELLYKIT_TOOLS: JellykitTool[] = [
  {
    "slug": "photo-editor",
    "name": "Photo Editor",
    "description": "Photo Editor — free, private browser tool. Zero uploads.",
    "category": "image",
    "available": true,
    "iconColor": "text-amber-600",
    "jellykit": true,
    "sourceCategory": "images"
  },
  {
    "slug": "screenshot-studio",
    "name": "Screenshot Studio",
    "description": "Screenshot Studio — free, private browser tool. Zero uploads.",
    "category": "image",
    "available": true,
    "iconColor": "text-amber-600",
    "jellykit": true,
    "sourceCategory": "images"
  },
  {
    "slug": "image-compress",
    "name": "Image Compressor",
    "description": "Image Compressor — free, private browser tool. Zero uploads.",
    "category": "image",
    "available": true,
    "iconColor": "text-amber-600",
    "jellykit": true,
    "sourceCategory": "images"
  },
  {
    "slug": "image-convert",
    "name": "Image Converter",
    "description": "Convert between PNG, JPEG, WebP and AVIF",
    "category": "image",
    "available": true,
    "iconColor": "text-amber-600",
    "jellykit": true,
    "sourceCategory": "images"
  },
  {
    "slug": "image-resize",
    "name": "Image Resizer",
    "description": "Resize by pixels or percentage with aspect lock",
    "category": "image",
    "available": true,
    "iconColor": "text-amber-600",
    "jellykit": true,
    "sourceCategory": "images"
  },
  {
    "slug": "pdf-to-images",
    "name": "PDF to Images",
    "description": "Render pages to PNG or JPEG at any DPI",
    "category": "image",
    "available": true,
    "iconColor": "text-amber-600",
    "jellykit": true,
    "sourceCategory": "images"
  },
  {
    "slug": "remove-metadata",
    "name": "Remove Metadata",
    "description": "Strip EXIF and GPS data without re-encoding",
    "category": "image",
    "available": true,
    "iconColor": "text-amber-600",
    "jellykit": true,
    "sourceCategory": "images"
  },
  {
    "slug": "images-to-pdf",
    "name": "Images to PDF",
    "description": "Combine images into a single PDF",
    "category": "image",
    "available": true,
    "iconColor": "text-amber-600",
    "jellykit": true,
    "sourceCategory": "images"
  },
  {
    "slug": "image-crop",
    "name": "Image Cropper",
    "description": "Crop to any aspect ratio, then export",
    "category": "image",
    "available": true,
    "iconColor": "text-amber-600",
    "jellykit": true,
    "sourceCategory": "images"
  },
  {
    "slug": "image-rotate",
    "name": "Image Rotator",
    "description": "Rotate, flip and straighten images",
    "category": "image",
    "available": true,
    "iconColor": "text-amber-600",
    "jellykit": true,
    "sourceCategory": "images"
  },
  {
    "slug": "image-metadata",
    "name": "Image Metadata",
    "description": "Inspect EXIF, camera, GPS and dimensions",
    "category": "image",
    "available": true,
    "iconColor": "text-amber-600",
    "jellykit": true,
    "sourceCategory": "images"
  },
  {
    "slug": "image-optimizer",
    "name": "Image Optimizer",
    "description": "One-click WebP optimization for the web",
    "category": "image",
    "available": true,
    "iconColor": "text-amber-600",
    "jellykit": true,
    "sourceCategory": "images"
  },
  {
    "slug": "batch-resize",
    "name": "Batch Resize",
    "description": "Resize dozens of images at once",
    "category": "image",
    "available": true,
    "iconColor": "text-amber-600",
    "jellykit": true,
    "sourceCategory": "images"
  },
  {
    "slug": "batch-convert",
    "name": "Batch Converter",
    "description": "Convert many images to one format",
    "category": "image",
    "available": true,
    "iconColor": "text-amber-600",
    "jellykit": true,
    "sourceCategory": "images"
  },
  {
    "slug": "batch-compress",
    "name": "Batch Compressor",
    "description": "Compress a whole folder of images",
    "category": "image",
    "available": true,
    "iconColor": "text-amber-600",
    "jellykit": true,
    "sourceCategory": "images"
  },
  {
    "slug": "image-redact",
    "name": "Blur & Redact",
    "description": "Hide faces, names and numbers before sharing",
    "category": "image",
    "available": true,
    "iconColor": "text-amber-600",
    "jellykit": true,
    "sourceCategory": "images"
  },
  {
    "slug": "image-pixelate",
    "name": "Pixelate",
    "description": "Pixelate selected areas of an image",
    "category": "image",
    "available": true,
    "iconColor": "text-amber-600",
    "jellykit": true,
    "sourceCategory": "images"
  },
  {
    "slug": "image-split",
    "name": "Image Splitter",
    "description": "Cut an image into a grid of tiles",
    "category": "image",
    "available": true,
    "iconColor": "text-amber-600",
    "jellykit": true,
    "sourceCategory": "images"
  },
  {
    "slug": "image-combine",
    "name": "Image Combiner",
    "description": "Join images side by side or stacked",
    "category": "image",
    "available": true,
    "iconColor": "text-amber-600",
    "jellykit": true,
    "sourceCategory": "images"
  },
  {
    "slug": "contact-sheet",
    "name": "Contact Sheet",
    "description": "Lay out many images in a captioned grid",
    "category": "image",
    "available": true,
    "iconColor": "text-amber-600",
    "jellykit": true,
    "sourceCategory": "images"
  },
  {
    "slug": "color-extractor",
    "name": "Color Extractor",
    "description": "Pull the dominant colors out of an image",
    "category": "image",
    "available": true,
    "iconColor": "text-amber-600",
    "jellykit": true,
    "sourceCategory": "images"
  },
  {
    "slug": "image-palette",
    "name": "Palette from Image",
    "description": "Turn a photo into a CSS-ready palette",
    "category": "image",
    "available": true,
    "iconColor": "text-amber-600",
    "jellykit": true,
    "sourceCategory": "images"
  },
  {
    "slug": "image-dimensions",
    "name": "Image Dimensions",
    "description": "Width, height, aspect ratio and megapixels",
    "category": "image",
    "available": true,
    "iconColor": "text-amber-600",
    "jellykit": true,
    "sourceCategory": "images"
  },
  {
    "slug": "image-compare",
    "name": "Image Compare",
    "description": "Compare two images with a slider or difference view",
    "category": "image",
    "available": true,
    "iconColor": "text-amber-600",
    "jellykit": true,
    "sourceCategory": "images"
  },
  {
    "slug": "image-filters",
    "name": "Image Filters",
    "description": "Apply film looks like Noir, Warm and Matte",
    "category": "image",
    "available": true,
    "iconColor": "text-amber-600",
    "jellykit": true,
    "sourceCategory": "images"
  },
  {
    "slug": "image-effects",
    "name": "Image Effects",
    "description": "21 effects: duotone, halftone, sketch, emboss, edges, posterize and more",
    "category": "image",
    "available": true,
    "iconColor": "text-amber-600",
    "jellykit": true,
    "sourceCategory": "images"
  },
  {
    "slug": "grayscale-image",
    "name": "Grayscale Image",
    "description": "Convert a photo to black and white",
    "category": "image",
    "available": true,
    "iconColor": "text-amber-600",
    "jellykit": true,
    "sourceCategory": "images"
  },
  {
    "slug": "sepia-filter",
    "name": "Sepia Filter",
    "description": "Warm vintage brown tones",
    "category": "image",
    "available": true,
    "iconColor": "text-amber-600",
    "jellykit": true,
    "sourceCategory": "images"
  },
  {
    "slug": "invert-image",
    "name": "Invert Colors",
    "description": "Negative of an image",
    "category": "image",
    "available": true,
    "iconColor": "text-amber-600",
    "jellykit": true,
    "sourceCategory": "images"
  },
  {
    "slug": "duotone-generator",
    "name": "Duotone Effect",
    "description": "Map shadows and highlights to two colors",
    "category": "image",
    "available": true,
    "iconColor": "text-amber-600",
    "jellykit": true,
    "sourceCategory": "images"
  },
  {
    "slug": "posterize-image",
    "name": "Posterize Image",
    "description": "Reduce to a few color levels",
    "category": "image",
    "available": true,
    "iconColor": "text-amber-600",
    "jellykit": true,
    "sourceCategory": "images"
  },
  {
    "slug": "threshold-image",
    "name": "Black & White Threshold",
    "description": "Pure black and white, adjustable cutoff",
    "category": "image",
    "available": true,
    "iconColor": "text-amber-600",
    "jellykit": true,
    "sourceCategory": "images"
  },
  {
    "slug": "emboss-image",
    "name": "Emboss Effect",
    "description": "Raised relief look",
    "category": "image",
    "available": true,
    "iconColor": "text-amber-600",
    "jellykit": true,
    "sourceCategory": "images"
  },
  {
    "slug": "edge-detection",
    "name": "Edge Detection",
    "description": "Sobel edges — outlines of an image",
    "category": "image",
    "available": true,
    "iconColor": "text-amber-600",
    "jellykit": true,
    "sourceCategory": "images"
  },
  {
    "slug": "photo-to-sketch",
    "name": "Photo to Pencil Sketch",
    "description": "Turn a photo into a pencil drawing",
    "category": "image",
    "available": true,
    "iconColor": "text-amber-600",
    "jellykit": true,
    "sourceCategory": "images"
  },
  {
    "slug": "halftone-generator",
    "name": "Halftone Generator",
    "description": "Comic-style dot screens",
    "category": "image",
    "available": true,
    "iconColor": "text-amber-600",
    "jellykit": true,
    "sourceCategory": "images"
  },
  {
    "slug": "pixel-art-maker",
    "name": "Pixelate Image",
    "description": "Blocky pixel-art look for the whole image",
    "category": "image",
    "available": true,
    "iconColor": "text-amber-600",
    "jellykit": true,
    "sourceCategory": "images"
  },
  {
    "slug": "colorize-image",
    "name": "Colorize Image",
    "description": "Tint a whole image with one color",
    "category": "image",
    "available": true,
    "iconColor": "text-amber-600",
    "jellykit": true,
    "sourceCategory": "images"
  },
  {
    "slug": "vignette-effect",
    "name": "Vignette",
    "description": "Darken the edges to focus attention",
    "category": "image",
    "available": true,
    "iconColor": "text-amber-600",
    "jellykit": true,
    "sourceCategory": "images"
  },
  {
    "slug": "film-grain",
    "name": "Film Grain",
    "description": "Add analog grain and noise",
    "category": "image",
    "available": true,
    "iconColor": "text-amber-600",
    "jellykit": true,
    "sourceCategory": "images"
  },
  {
    "slug": "blur-image",
    "name": "Blur Image",
    "description": "Blur a whole image (for backgrounds)",
    "category": "image",
    "available": true,
    "iconColor": "text-amber-600",
    "jellykit": true,
    "sourceCategory": "images"
  },
  {
    "slug": "sharpen-image",
    "name": "Sharpen Image",
    "description": "Crisper detail",
    "category": "image",
    "available": true,
    "iconColor": "text-amber-600",
    "jellykit": true,
    "sourceCategory": "images"
  },
  {
    "slug": "gamma-correction",
    "name": "Gamma Correction",
    "description": "Brighten or darken midtones",
    "category": "image",
    "available": true,
    "iconColor": "text-amber-600",
    "jellykit": true,
    "sourceCategory": "images"
  },
  {
    "slug": "hue-shift",
    "name": "Hue Shift",
    "description": "Rotate every color around the color wheel",
    "category": "image",
    "available": true,
    "iconColor": "text-amber-600",
    "jellykit": true,
    "sourceCategory": "images"
  },
  {
    "slug": "solarize-image",
    "name": "Solarize",
    "description": "Partially inverted, surreal tones",
    "category": "image",
    "available": true,
    "iconColor": "text-amber-600",
    "jellykit": true,
    "sourceCategory": "images"
  },
  {
    "slug": "image-color-blindness",
    "name": "Color Blindness Check (Image)",
    "description": "Preview a screenshot or chart under four types of color blindness",
    "category": "image",
    "available": true,
    "iconColor": "text-amber-600",
    "jellykit": true,
    "sourceCategory": "images"
  },
  {
    "slug": "image-viewer",
    "name": "Image Viewer",
    "description": "Zoom, pan and flip through images with the keyboard",
    "category": "image",
    "available": true,
    "iconColor": "text-amber-600",
    "jellykit": true,
    "sourceCategory": "images"
  },
  {
    "slug": "image-transform",
    "name": "Rotate, Flip & Crop (Batch)",
    "description": "Rotate, flip, crop to a ratio and frame — one image or hundreds",
    "category": "image",
    "available": true,
    "iconColor": "text-amber-600",
    "jellykit": true,
    "sourceCategory": "images"
  },
  {
    "slug": "image-flip",
    "name": "Image Flipper",
    "description": "Mirror an image horizontally or vertically",
    "category": "image",
    "available": true,
    "iconColor": "text-amber-600",
    "jellykit": true,
    "sourceCategory": "images"
  },
  {
    "slug": "batch-rotate",
    "name": "Batch Rotate",
    "description": "Rotate or flip many images at once",
    "category": "image",
    "available": true,
    "iconColor": "text-amber-600",
    "jellykit": true,
    "sourceCategory": "images"
  },
  {
    "slug": "batch-crop",
    "name": "Batch Crop to Ratio",
    "description": "Crop many images to 1:1, 4:5, 16:9 and more",
    "category": "image",
    "available": true,
    "iconColor": "text-amber-600",
    "jellykit": true,
    "sourceCategory": "images"
  },
  {
    "slug": "image-border",
    "name": "Add Border & Frame",
    "description": "Borders, padding, shadows and a background around photos",
    "category": "image",
    "available": true,
    "iconColor": "text-amber-600",
    "jellykit": true,
    "sourceCategory": "images"
  },
  {
    "slug": "rounded-corners",
    "name": "Rounded Corners",
    "description": "Round the corners of any image (transparent PNG)",
    "category": "image",
    "available": true,
    "iconColor": "text-amber-600",
    "jellykit": true,
    "sourceCategory": "images"
  },
  {
    "slug": "circle-crop",
    "name": "Circle Crop",
    "description": "Crop to a circle — for avatars and profile photos",
    "category": "image",
    "available": true,
    "iconColor": "text-amber-600",
    "jellykit": true,
    "sourceCategory": "images"
  },
  {
    "slug": "screenshot-stitch-vertical",
    "name": "Stitch Screenshots (Vertical)",
    "description": "Combine screenshots into one long image",
    "category": "image",
    "available": true,
    "iconColor": "text-amber-600",
    "jellykit": true,
    "sourceCategory": "images"
  },
  {
    "slug": "screenshot-stitch-horizontal",
    "name": "Stitch Images (Side by Side)",
    "description": "Join images left to right",
    "category": "image",
    "available": true,
    "iconColor": "text-amber-600",
    "jellykit": true,
    "sourceCategory": "images"
  },
  {
    "slug": "browser-mockup",
    "name": "Browser Mockup",
    "description": "Put a screenshot in a browser window",
    "category": "image",
    "available": true,
    "iconColor": "text-amber-600",
    "jellykit": true,
    "sourceCategory": "images"
  },
  {
    "slug": "macos-window-frame",
    "name": "macOS Window Frame",
    "description": "Screenshot in a macOS window with traffic lights",
    "category": "image",
    "available": true,
    "iconColor": "text-amber-600",
    "jellykit": true,
    "sourceCategory": "images"
  },
  {
    "slug": "windows-window-frame",
    "name": "Windows Window Frame",
    "description": "Screenshot in a Windows-style title bar",
    "category": "image",
    "available": true,
    "iconColor": "text-amber-600",
    "jellykit": true,
    "sourceCategory": "images"
  },
  {
    "slug": "phone-mockup",
    "name": "Phone Mockup",
    "description": "Screenshot inside a modern phone frame",
    "category": "image",
    "available": true,
    "iconColor": "text-amber-600",
    "jellykit": true,
    "sourceCategory": "images"
  },
  {
    "slug": "laptop-mockup",
    "name": "Laptop Mockup",
    "description": "Screenshot on a laptop screen",
    "category": "image",
    "available": true,
    "iconColor": "text-amber-600",
    "jellykit": true,
    "sourceCategory": "images"
  },
  {
    "slug": "jpg-to-png",
    "name": "JPG to PNG",
    "description": "Convert JPG images to PNG — one or many",
    "category": "image",
    "available": true,
    "iconColor": "text-amber-600",
    "jellykit": true,
    "sourceCategory": "images"
  },
  {
    "slug": "png-to-jpg",
    "name": "PNG to JPG",
    "description": "Convert PNG images to JPG — one or many",
    "category": "image",
    "available": true,
    "iconColor": "text-amber-600",
    "jellykit": true,
    "sourceCategory": "images"
  },
  {
    "slug": "jpg-to-webp",
    "name": "JPG to WebP",
    "description": "Convert JPG images to WebP — one or many",
    "category": "image",
    "available": true,
    "iconColor": "text-amber-600",
    "jellykit": true,
    "sourceCategory": "images"
  },
  {
    "slug": "png-to-webp",
    "name": "PNG to WebP",
    "description": "Convert PNG images to WebP — one or many",
    "category": "image",
    "available": true,
    "iconColor": "text-amber-600",
    "jellykit": true,
    "sourceCategory": "images"
  },
  {
    "slug": "webp-to-jpg",
    "name": "WebP to JPG",
    "description": "Convert WebP images to JPG — one or many",
    "category": "image",
    "available": true,
    "iconColor": "text-amber-600",
    "jellykit": true,
    "sourceCategory": "images"
  },
  {
    "slug": "webp-to-png",
    "name": "WebP to PNG",
    "description": "Convert WebP images to PNG — one or many",
    "category": "image",
    "available": true,
    "iconColor": "text-amber-600",
    "jellykit": true,
    "sourceCategory": "images"
  },
  {
    "slug": "avif-to-jpg",
    "name": "AVIF to JPG",
    "description": "Convert AVIF images to JPG — one or many",
    "category": "image",
    "available": true,
    "iconColor": "text-amber-600",
    "jellykit": true,
    "sourceCategory": "images"
  },
  {
    "slug": "avif-to-png",
    "name": "AVIF to PNG",
    "description": "Convert AVIF images to PNG — one or many",
    "category": "image",
    "available": true,
    "iconColor": "text-amber-600",
    "jellykit": true,
    "sourceCategory": "images"
  },
  {
    "slug": "bmp-to-png",
    "name": "BMP to PNG",
    "description": "Convert BMP images to PNG — one or many",
    "category": "image",
    "available": true,
    "iconColor": "text-amber-600",
    "jellykit": true,
    "sourceCategory": "images"
  },
  {
    "slug": "gif-to-png",
    "name": "GIF to PNG",
    "description": "Convert GIF images to PNG — one or many",
    "category": "image",
    "available": true,
    "iconColor": "text-amber-600",
    "jellykit": true,
    "sourceCategory": "images"
  },
  {
    "slug": "text-favicon",
    "name": "Letter / Emoji Favicon",
    "description": "A favicon from a letter, initials or an emoji",
    "category": "image",
    "available": true,
    "iconColor": "text-amber-600",
    "jellykit": true,
    "sourceCategory": "images"
  },
  {
    "slug": "image-to-ico",
    "name": "Image to ICO",
    "description": "Convert PNG, JPG or SVG to a multi-size .ico file",
    "category": "image",
    "available": true,
    "iconColor": "text-amber-600",
    "jellykit": true,
    "sourceCategory": "images"
  },
  {
    "slug": "app-icon-generator",
    "name": "App Icon Generator",
    "description": "Every iOS and Android launcher icon size from one image",
    "category": "image",
    "available": true,
    "iconColor": "text-amber-600",
    "jellykit": true,
    "sourceCategory": "images"
  },
  {
    "slug": "remove-background",
    "name": "Remove Solid Background",
    "description": "Make plain or white backgrounds transparent — logos, products, signatures",
    "category": "image",
    "available": true,
    "iconColor": "text-amber-600",
    "jellykit": true,
    "sourceCategory": "images"
  },
  {
    "slug": "remove-white-background",
    "name": "Remove White Background",
    "description": "Turn white pixels transparent, including inside letters",
    "category": "image",
    "available": true,
    "iconColor": "text-amber-600",
    "jellykit": true,
    "sourceCategory": "images"
  },
  {
    "slug": "signature-extractor",
    "name": "Signature Extractor",
    "description": "Lift a handwritten signature off paper as a transparent PNG",
    "category": "image",
    "available": true,
    "iconColor": "text-amber-600",
    "jellykit": true,
    "sourceCategory": "images"
  },
  {
    "slug": "green-screen-remover",
    "name": "Green Screen Remover",
    "description": "Chroma-key green or blue backgrounds with spill suppression",
    "category": "image",
    "available": true,
    "iconColor": "text-amber-600",
    "jellykit": true,
    "sourceCategory": "images"
  },
  {
    "slug": "meme-generator",
    "name": "Meme Generator",
    "description": "Classic top and bottom text on any image",
    "category": "image",
    "available": true,
    "iconColor": "text-amber-600",
    "jellykit": true,
    "sourceCategory": "images"
  },
  {
    "slug": "add-caption",
    "name": "Add Caption to Image",
    "description": "A clean caption bar above or below an image",
    "category": "image",
    "available": true,
    "iconColor": "text-amber-600",
    "jellykit": true,
    "sourceCategory": "images"
  },
  {
    "slug": "add-text-to-image",
    "name": "Add Text to Image",
    "description": "Place text with outline, font and position on a photo",
    "category": "image",
    "available": true,
    "iconColor": "text-amber-600",
    "jellykit": true,
    "sourceCategory": "images"
  },
  {
    "slug": "image-to-ascii",
    "name": "Image to ASCII Art",
    "description": "Text art from an image — plain, Unicode blocks or coloured HTML",
    "category": "image",
    "available": true,
    "iconColor": "text-amber-600",
    "jellykit": true,
    "sourceCategory": "images"
  },
  {
    "slug": "sprite-sheet-generator",
    "name": "Sprite Sheet Generator",
    "description": "Pack icons or frames into one PNG with CSS and JSON",
    "category": "image",
    "available": true,
    "iconColor": "text-amber-600",
    "jellykit": true,
    "sourceCategory": "images"
  },
  {
    "slug": "placeholder-image",
    "name": "Placeholder Image Generator",
    "description": "Dummy images of any size as PNG, JPG, WebP or SVG",
    "category": "image",
    "available": true,
    "iconColor": "text-amber-600",
    "jellykit": true,
    "sourceCategory": "images"
  },
  {
    "slug": "image-to-base64",
    "name": "Image to Base64",
    "description": "Encode an image as a Base64 data URI for HTML or CSS",
    "category": "image",
    "available": true,
    "iconColor": "text-amber-600",
    "jellykit": true,
    "sourceCategory": "images"
  },
  {
    "slug": "batch-images",
    "name": "Batch Image Processor",
    "description": "Resize, convert and compress many images to a ZIP",
    "category": "image",
    "available": true,
    "iconColor": "text-amber-600",
    "jellykit": true,
    "sourceCategory": "images"
  },
  {
    "slug": "pdf-images",
    "name": "Extract PDF Images",
    "description": "Save the images embedded inside a PDF",
    "category": "image",
    "available": true,
    "iconColor": "text-amber-600",
    "jellykit": true,
    "sourceCategory": "images"
  },
  {
    "slug": "svg-to-png",
    "name": "SVG to PNG",
    "description": "Rasterize SVG at any size",
    "category": "image",
    "available": true,
    "iconColor": "text-amber-600",
    "jellykit": true,
    "sourceCategory": "images"
  },
  {
    "slug": "color-blindness-simulator",
    "name": "Color Blindness Simulator",
    "description": "See images and palettes as people with color vision deficiencies do",
    "category": "image",
    "available": true,
    "iconColor": "text-amber-600",
    "jellykit": true,
    "sourceCategory": "images"
  },
  {
    "slug": "background-generator",
    "name": "Background Generator",
    "description": "Wallpapers: mesh, gradients, noise and patterns at any size",
    "category": "image",
    "available": true,
    "iconColor": "text-amber-600",
    "jellykit": true,
    "sourceCategory": "images"
  },
  {
    "slug": "mesh-gradient-generator",
    "name": "Mesh Gradient Generator",
    "description": "Soft, blended multi-color gradients",
    "category": "image",
    "available": true,
    "iconColor": "text-amber-600",
    "jellykit": true,
    "sourceCategory": "images"
  },
  {
    "slug": "pattern-generator",
    "name": "Pattern Generator",
    "description": "Dots, grids, stripes, waves, checks and geometric patterns",
    "category": "image",
    "available": true,
    "iconColor": "text-amber-600",
    "jellykit": true,
    "sourceCategory": "images"
  },
  {
    "slug": "noise-texture-generator",
    "name": "Noise Texture Generator",
    "description": "Grainy textures as PNG",
    "category": "image",
    "available": true,
    "iconColor": "text-amber-600",
    "jellykit": true,
    "sourceCategory": "images"
  },
  {
    "slug": "css-pattern-generator",
    "name": "CSS Pattern Generator",
    "description": "Patterns you can copy as pure CSS backgrounds",
    "category": "image",
    "available": true,
    "iconColor": "text-amber-600",
    "jellykit": true,
    "sourceCategory": "images"
  },
  {
    "slug": "gif-frames",
    "name": "GIF Frame Extractor",
    "description": "Split an animated GIF into individual frames",
    "category": "image",
    "available": true,
    "iconColor": "text-amber-600",
    "jellykit": true,
    "sourceCategory": "images"
  },
  {
    "slug": "webcam-photo",
    "name": "Webcam Photo",
    "description": "Take photos with your camera, with a countdown",
    "category": "image",
    "available": true,
    "iconColor": "text-amber-600",
    "jellykit": true,
    "sourceCategory": "images"
  },
  {
    "slug": "pdf-studio",
    "name": "PDF Studio",
    "description": "PDF Studio — free, private browser tool. Zero uploads.",
    "category": "pdf",
    "available": true,
    "iconColor": "text-rose-600",
    "jellykit": true,
    "sourceCategory": "pdf"
  },
  {
    "slug": "pdf-compress",
    "name": "Compress PDF",
    "description": "Compress PDF — free, private browser tool. Zero uploads.",
    "category": "pdf",
    "available": true,
    "iconColor": "text-rose-600",
    "jellykit": true,
    "sourceCategory": "pdf"
  },
  {
    "slug": "pdf-merge",
    "name": "Merge PDF",
    "description": "Merge PDF — free, private browser tool. Zero uploads.",
    "category": "pdf",
    "available": true,
    "iconColor": "text-rose-600",
    "jellykit": true,
    "sourceCategory": "pdf"
  },
  {
    "slug": "pdf-split",
    "name": "Split PDF",
    "description": "Split by ranges, every page or every N pages",
    "category": "pdf",
    "available": true,
    "iconColor": "text-rose-600",
    "jellykit": true,
    "sourceCategory": "pdf"
  },
  {
    "slug": "pdf-unlock",
    "name": "Unlock PDF",
    "description": "Remove a PDF’s password or printing/copying restrictions",
    "category": "pdf",
    "available": true,
    "iconColor": "text-rose-600",
    "jellykit": true,
    "sourceCategory": "pdf"
  },
  {
    "slug": "pdf-redact",
    "name": "Redact PDF (secure)",
    "description": "Black out text so it’s truly removed — search or draw, then flatten",
    "category": "pdf",
    "available": true,
    "iconColor": "text-rose-600",
    "jellykit": true,
    "sourceCategory": "pdf"
  },
  {
    "slug": "pdf-viewer",
    "name": "PDF Viewer",
    "description": "Fast, private PDF reading with zoom and search",
    "category": "pdf",
    "available": true,
    "iconColor": "text-rose-600",
    "jellykit": true,
    "sourceCategory": "pdf"
  },
  {
    "slug": "pdf-extract",
    "name": "Extract Pages",
    "description": "Pick pages and save them as a new PDF",
    "category": "pdf",
    "available": true,
    "iconColor": "text-rose-600",
    "jellykit": true,
    "sourceCategory": "pdf"
  },
  {
    "slug": "pdf-delete-pages",
    "name": "Delete Pages",
    "description": "Remove unwanted pages",
    "category": "pdf",
    "available": true,
    "iconColor": "text-rose-600",
    "jellykit": true,
    "sourceCategory": "pdf"
  },
  {
    "slug": "pdf-reorder",
    "name": "Reorder Pages",
    "description": "Drag pages into a new order",
    "category": "pdf",
    "available": true,
    "iconColor": "text-rose-600",
    "jellykit": true,
    "sourceCategory": "pdf"
  },
  {
    "slug": "pdf-rotate",
    "name": "Rotate Pages",
    "description": "Turn individual pages or all of them",
    "category": "pdf",
    "available": true,
    "iconColor": "text-rose-600",
    "jellykit": true,
    "sourceCategory": "pdf"
  },
  {
    "slug": "pdf-duplicate",
    "name": "Duplicate Pages",
    "description": "Copy pages within a document",
    "category": "pdf",
    "available": true,
    "iconColor": "text-rose-600",
    "jellykit": true,
    "sourceCategory": "pdf"
  },
  {
    "slug": "pdf-reverse",
    "name": "Reverse Pages",
    "description": "Flip the page order",
    "category": "pdf",
    "available": true,
    "iconColor": "text-rose-600",
    "jellykit": true,
    "sourceCategory": "pdf"
  },
  {
    "slug": "pdf-organizer",
    "name": "Page Organizer",
    "description": "Visual page grid for any document",
    "category": "pdf",
    "available": true,
    "iconColor": "text-rose-600",
    "jellykit": true,
    "sourceCategory": "pdf"
  },
  {
    "slug": "pdf-annotate",
    "name": "PDF Annotator",
    "description": "Highlight, underline, draw and comment",
    "category": "pdf",
    "available": true,
    "iconColor": "text-rose-600",
    "jellykit": true,
    "sourceCategory": "pdf"
  },
  {
    "slug": "pdf-sign",
    "name": "Sign PDF",
    "description": "Draw or type a signature and place it",
    "category": "pdf",
    "available": true,
    "iconColor": "text-rose-600",
    "jellykit": true,
    "sourceCategory": "pdf"
  },
  {
    "slug": "pdf-to-text",
    "name": "PDF to Text",
    "description": "Extract the text layer from every page",
    "category": "pdf",
    "available": true,
    "iconColor": "text-rose-600",
    "jellykit": true,
    "sourceCategory": "pdf"
  },
  {
    "slug": "pdf-inspector",
    "name": "PDF Metadata",
    "description": "View and edit title, author and document info",
    "category": "pdf",
    "available": true,
    "iconColor": "text-rose-600",
    "jellykit": true,
    "sourceCategory": "pdf"
  },
  {
    "slug": "pdf-remove-metadata",
    "name": "Remove PDF Metadata",
    "description": "Strip author, software and XMP metadata",
    "category": "pdf",
    "available": true,
    "iconColor": "text-rose-600",
    "jellykit": true,
    "sourceCategory": "pdf"
  },
  {
    "slug": "pdf-size-analyzer",
    "name": "PDF Size Analyzer",
    "description": "See what makes a PDF large: images, fonts, pages",
    "category": "pdf",
    "available": true,
    "iconColor": "text-rose-600",
    "jellykit": true,
    "sourceCategory": "pdf"
  },
  {
    "slug": "pdf-watermark",
    "name": "Add Watermark",
    "description": "Stamp text diagonally across pages",
    "category": "pdf",
    "available": true,
    "iconColor": "text-rose-600",
    "jellykit": true,
    "sourceCategory": "pdf"
  },
  {
    "slug": "pdf-page-numbers",
    "name": "Add Page Numbers",
    "description": "Number pages with your choice of format and position",
    "category": "pdf",
    "available": true,
    "iconColor": "text-rose-600",
    "jellykit": true,
    "sourceCategory": "pdf"
  },
  {
    "slug": "pdf-screenshot",
    "name": "PDF Screenshot",
    "description": "Capture a region of a page as a crisp PNG",
    "category": "pdf",
    "available": true,
    "iconColor": "text-rose-600",
    "jellykit": true,
    "sourceCategory": "pdf"
  },
  {
    "slug": "pdf-delete-blank",
    "name": "Remove Pages by Range",
    "description": "Drop page ranges like 2-4, 9",
    "category": "pdf",
    "available": true,
    "iconColor": "text-rose-600",
    "jellykit": true,
    "sourceCategory": "pdf"
  },
  {
    "slug": "pdf-compare",
    "name": "Compare PDFs",
    "description": "Side-by-side, overlay, blink and difference views with per-page change scores",
    "category": "pdf",
    "available": true,
    "iconColor": "text-rose-600",
    "jellykit": true,
    "sourceCategory": "pdf"
  },
  {
    "slug": "pdf-header-footer",
    "name": "PDF Header & Footer",
    "description": "Add file name, dates and page numbers to the top and bottom",
    "category": "pdf",
    "available": true,
    "iconColor": "text-rose-600",
    "jellykit": true,
    "sourceCategory": "pdf"
  },
  {
    "slug": "pdf-add-date",
    "name": "Add Date to PDF",
    "description": "Stamp today’s (or any) date on every page",
    "category": "pdf",
    "available": true,
    "iconColor": "text-rose-600",
    "jellykit": true,
    "sourceCategory": "pdf"
  },
  {
    "slug": "pdf-bates",
    "name": "Bates Numbering",
    "description": "Sequential legal numbering like ACME-000001",
    "category": "pdf",
    "available": true,
    "iconColor": "text-rose-600",
    "jellykit": true,
    "sourceCategory": "pdf"
  },
  {
    "slug": "pdf-flatten",
    "name": "Flatten PDF Form",
    "description": "Turn filled-in form fields into fixed page content",
    "category": "pdf",
    "available": true,
    "iconColor": "text-rose-600",
    "jellykit": true,
    "sourceCategory": "pdf"
  },
  {
    "slug": "pdf-structure",
    "name": "PDF Structure Inspector",
    "description": "Version, pages, fonts, attachments, color spaces and annotations",
    "category": "pdf",
    "available": true,
    "iconColor": "text-rose-600",
    "jellykit": true,
    "sourceCategory": "pdf"
  },
  {
    "slug": "pdf-page-counter",
    "name": "PDF Page Counter",
    "description": "How many pages — plus paper sizes and orientation",
    "category": "pdf",
    "available": true,
    "iconColor": "text-rose-600",
    "jellykit": true,
    "sourceCategory": "pdf"
  },
  {
    "slug": "pdf-page-dimensions",
    "name": "PDF Page Size & Orientation",
    "description": "Exact size, paper name, rotation and boxes for every page",
    "category": "pdf",
    "available": true,
    "iconColor": "text-rose-600",
    "jellykit": true,
    "sourceCategory": "pdf"
  },
  {
    "slug": "pdf-version",
    "name": "PDF Version Checker",
    "description": "PDF version, encryption, tagging and fast web view",
    "category": "pdf",
    "available": true,
    "iconColor": "text-rose-600",
    "jellykit": true,
    "sourceCategory": "pdf"
  },
  {
    "slug": "pdf-fonts",
    "name": "PDF Font Inspector",
    "description": "Which fonts are used, embedded or substituted",
    "category": "pdf",
    "available": true,
    "iconColor": "text-rose-600",
    "jellykit": true,
    "sourceCategory": "pdf"
  },
  {
    "slug": "pdf-attachments",
    "name": "PDF Attachment Extractor",
    "description": "List and save files embedded inside a PDF",
    "category": "pdf",
    "available": true,
    "iconColor": "text-rose-600",
    "jellykit": true,
    "sourceCategory": "pdf"
  },
  {
    "slug": "pdf-color-space",
    "name": "PDF Color Space Inspector",
    "description": "Image color spaces (RGB, CMYK, gray) and annotation types",
    "category": "pdf",
    "available": true,
    "iconColor": "text-rose-600",
    "jellykit": true,
    "sourceCategory": "pdf"
  },
  {
    "slug": "text-to-pdf",
    "name": "Text to PDF",
    "description": "Turn plain text into a clean, paginated PDF",
    "category": "pdf",
    "available": true,
    "iconColor": "text-rose-600",
    "jellykit": true,
    "sourceCategory": "pdf"
  },
  {
    "slug": "markdown-to-pdf",
    "name": "Markdown to PDF",
    "description": "Print Markdown as a styled PDF (any language)",
    "category": "pdf",
    "available": true,
    "iconColor": "text-rose-600",
    "jellykit": true,
    "sourceCategory": "pdf"
  },
  {
    "slug": "html-to-pdf",
    "name": "HTML to PDF",
    "description": "Print sanitized HTML as a PDF via your browser",
    "category": "pdf",
    "available": true,
    "iconColor": "text-rose-600",
    "jellykit": true,
    "sourceCategory": "pdf"
  },
  {
    "slug": "pdf-word-counter",
    "name": "PDF Word Counter",
    "description": "Words, characters, reading time and per-page counts",
    "category": "pdf",
    "available": true,
    "iconColor": "text-rose-600",
    "jellykit": true,
    "sourceCategory": "pdf"
  },
  {
    "slug": "pdf-to-html",
    "name": "PDF to HTML",
    "description": "Convert the text layer into simple semantic HTML",
    "category": "pdf",
    "available": true,
    "iconColor": "text-rose-600",
    "jellykit": true,
    "sourceCategory": "pdf"
  },
  {
    "slug": "pdf-presentation",
    "name": "PDF Presentation Mode",
    "description": "Full-screen slides with keyboard navigation",
    "category": "pdf",
    "available": true,
    "iconColor": "text-rose-600",
    "jellykit": true,
    "sourceCategory": "pdf"
  },
  {
    "slug": "pdf-to-webp",
    "name": "PDF to WebP",
    "description": "Render pages as WebP images (where the browser supports it)",
    "category": "pdf",
    "available": true,
    "iconColor": "text-rose-600",
    "jellykit": true,
    "sourceCategory": "pdf"
  },
  {
    "slug": "pdf-to-png",
    "name": "PDF to PNG",
    "description": "Render pages as lossless PNG images",
    "category": "pdf",
    "available": true,
    "iconColor": "text-rose-600",
    "jellykit": true,
    "sourceCategory": "pdf"
  },
  {
    "slug": "pdf-extract-odd-even",
    "name": "Extract Odd or Even Pages",
    "description": "Split out odd or even pages (e.g. for duplex scans)",
    "category": "pdf",
    "available": true,
    "iconColor": "text-rose-600",
    "jellykit": true,
    "sourceCategory": "pdf"
  },
  {
    "slug": "pdf-protect",
    "name": "Protect PDF",
    "description": "Encrypt a PDF with a password (AES-256)",
    "category": "pdf",
    "available": true,
    "iconColor": "text-rose-600",
    "jellykit": true,
    "sourceCategory": "pdf"
  },
  {
    "slug": "pdf-change-password",
    "name": "Change PDF Password",
    "description": "Replace the password or permissions of a protected PDF",
    "category": "pdf",
    "available": true,
    "iconColor": "text-rose-600",
    "jellykit": true,
    "sourceCategory": "pdf"
  },
  {
    "slug": "pdf-restrict",
    "name": "Restrict PDF Permissions",
    "description": "Block copying, editing or printing without an open password",
    "category": "pdf",
    "available": true,
    "iconColor": "text-rose-600",
    "jellykit": true,
    "sourceCategory": "pdf"
  },
  {
    "slug": "pdf-n-up",
    "name": "N-up PDF (Pages per Sheet)",
    "description": "Put 2, 4, 6, 9 or 16 pages on each sheet to save paper",
    "category": "pdf",
    "available": true,
    "iconColor": "text-rose-600",
    "jellykit": true,
    "sourceCategory": "pdf"
  },
  {
    "slug": "pdf-booklet",
    "name": "PDF Booklet Maker",
    "description": "Impose pages for printing and folding into a booklet",
    "category": "pdf",
    "available": true,
    "iconColor": "text-rose-600",
    "jellykit": true,
    "sourceCategory": "pdf"
  },
  {
    "slug": "pdf-crop",
    "name": "Crop PDF",
    "description": "Trim page margins, with automatic white-space detection",
    "category": "pdf",
    "available": true,
    "iconColor": "text-rose-600",
    "jellykit": true,
    "sourceCategory": "pdf"
  },
  {
    "slug": "pdf-resize",
    "name": "Resize PDF Pages",
    "description": "Scale pages to A4, Letter, A3, A5 or Legal",
    "category": "pdf",
    "available": true,
    "iconColor": "text-rose-600",
    "jellykit": true,
    "sourceCategory": "pdf"
  },
  {
    "slug": "pdf-margins",
    "name": "Add Margins to PDF",
    "description": "Add white space around pages for binding or notes",
    "category": "pdf",
    "available": true,
    "iconColor": "text-rose-600",
    "jellykit": true,
    "sourceCategory": "pdf"
  },
  {
    "slug": "pdf-interleave",
    "name": "Merge Front & Back Scans",
    "description": "Interleave two PDFs: front 1, back 1, front 2…",
    "category": "pdf",
    "available": true,
    "iconColor": "text-rose-600",
    "jellykit": true,
    "sourceCategory": "pdf"
  },
  {
    "slug": "csv-studio",
    "name": "CSV Studio",
    "description": "CSV Studio — free, private browser tool. Zero uploads.",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "data"
  },
  {
    "slug": "json-studio",
    "name": "JSON Studio",
    "description": "JSON Studio — free, private browser tool. Zero uploads.",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "data"
  },
  {
    "slug": "mock-data-generator",
    "name": "Mock Data Generator",
    "description": "Synthetic users, orders and more — JSON, CSV, SQL or TypeScript",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "data"
  },
  {
    "slug": "csv-analyzer",
    "name": "CSV Analyzer",
    "description": "Column types, statistics, distributions and outliers",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "data"
  },
  {
    "slug": "csv-cleaner",
    "name": "CSV Cleaner",
    "description": "Trim, dedupe, rename, split and convert columns",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "data"
  },
  {
    "slug": "csv-chart",
    "name": "CSV Charts",
    "description": "Bar, line, histogram, scatter and pie charts",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "data"
  },
  {
    "slug": "csv-duplicates",
    "name": "Duplicate Row Finder",
    "description": "Count and remove exact duplicate rows",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "data"
  },
  {
    "slug": "csv-missing",
    "name": "Missing Value Analyzer",
    "description": "Find empty cells per column at a glance",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "data"
  },
  {
    "slug": "csv-split-column",
    "name": "Column Splitter",
    "description": "Split one column into several by a delimiter",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "data"
  },
  {
    "slug": "csv-merge-columns",
    "name": "Column Merger",
    "description": "Join columns into one with a separator",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "data"
  },
  {
    "slug": "csv-sort-filter",
    "name": "Sort & Filter Data",
    "description": "Sort by any column and filter rows instantly",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "data"
  },
  {
    "slug": "csv-to-json",
    "name": "CSV to JSON",
    "description": "Turn CSV rows into a JSON array of objects",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "data"
  },
  {
    "slug": "json-to-csv",
    "name": "JSON to CSV",
    "description": "Flatten JSON arrays into a spreadsheet",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "data"
  },
  {
    "slug": "json-validator",
    "name": "JSON Validator",
    "description": "Find syntax errors with exact line and column",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "data"
  },
  {
    "slug": "json-viewer",
    "name": "JSON Viewer",
    "description": "Collapsible tree view for large documents",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "data"
  },
  {
    "slug": "json-schema",
    "name": "JSON Schema Generator",
    "description": "Infer a JSON Schema from sample data",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "data"
  },
  {
    "slug": "json-diff",
    "name": "JSON Diff",
    "description": "Compare two JSON documents, key order ignored",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "data"
  },
  {
    "slug": "tsv-to-csv",
    "name": "TSV to CSV",
    "description": "Tab-separated to comma-separated, with correct quoting",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "data"
  },
  {
    "slug": "csv-to-tsv",
    "name": "CSV to TSV",
    "description": "Comma-separated to tab-separated",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "data"
  },
  {
    "slug": "csv-delimiter-converter",
    "name": "CSV Delimiter Converter",
    "description": "Switch between comma, semicolon, tab and pipe",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "data"
  },
  {
    "slug": "csv-validator",
    "name": "CSV Validator",
    "description": "Find ragged rows, duplicate headers and parse errors",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "data"
  },
  {
    "slug": "csv-formatter",
    "name": "CSV Formatter",
    "description": "Normalize quoting, trim cells and fix line endings",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "data"
  },
  {
    "slug": "statistics-calculator",
    "name": "Statistics Calculator",
    "description": "Mean, median, mode, standard deviation, percentiles and outliers",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "data"
  },
  {
    "slug": "standard-deviation",
    "name": "Standard Deviation Calculator",
    "description": "Sample and population standard deviation and variance",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "data"
  },
  {
    "slug": "percentile-calculator",
    "name": "Percentile Calculator",
    "description": "Quartiles, IQR and P10–P99",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "data"
  },
  {
    "slug": "yaml-json",
    "name": "YAML ⇄ JSON",
    "description": "Convert between YAML and JSON both ways",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "data"
  },
  {
    "slug": "json-minifier",
    "name": "JSON Minifier",
    "description": "Remove whitespace and see the size saved",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "data"
  },
  {
    "slug": "json-sort-keys",
    "name": "JSON Sort Keys",
    "description": "Alphabetize keys at every level",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "data"
  },
  {
    "slug": "json-flatten",
    "name": "JSON Flatten",
    "description": "Nested objects to dot-path keys",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "data"
  },
  {
    "slug": "json-unflatten",
    "name": "JSON Unflatten",
    "description": "Dot-path keys back to nested JSON",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "data"
  },
  {
    "slug": "json-escape",
    "name": "JSON Escape",
    "description": "Turn text into a JSON string literal",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "data"
  },
  {
    "slug": "json-unescape",
    "name": "JSON Unescape",
    "description": "Turn a JSON string literal back into text",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "data"
  },
  {
    "slug": "json-path",
    "name": "JSONPath Tester",
    "description": "Query JSON with $.store.book[*].title and filters",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "data"
  },
  {
    "slug": "json-to-typescript",
    "name": "JSON to TypeScript",
    "description": "Generate interfaces from a JSON sample",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "data"
  },
  {
    "slug": "csv-to-sql",
    "name": "CSV to SQL INSERT",
    "description": "INSERT statements (and CREATE TABLE) from CSV",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "data"
  },
  {
    "slug": "json-to-sql",
    "name": "JSON to SQL INSERT",
    "description": "INSERT statements from an array of JSON objects",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "data"
  },
  {
    "slug": "mock-csv",
    "name": "Mock CSV Generator",
    "description": "Synthetic CSV datasets from a schema",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "data"
  },
  {
    "slug": "base64",
    "name": "Base64 Encoder",
    "description": "Encode text or files as Base64 and data URLs",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "developer"
  },
  {
    "slug": "color-tools",
    "name": "Color Picker",
    "description": "Pick and convert HEX, RGB, HSL, HSV and OKLCH",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "developer"
  },
  {
    "slug": "url-cleaner",
    "name": "URL Cleaner",
    "description": "Strip utm_, fbclid, gclid and other tracking from links",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "developer"
  },
  {
    "slug": "regex-library",
    "name": "Regex Patterns",
    "description": "Ready-made patterns for emails, URLs, dates and more",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "developer"
  },
  {
    "slug": "base64-decode",
    "name": "Base64 Decoder",
    "description": "Decode Base64 back to text or a file",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "developer"
  },
  {
    "slug": "url-decoder",
    "name": "URL Decoder",
    "description": "Decode percent-encoded URLs and parameters",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "developer"
  },
  {
    "slug": "html-entities",
    "name": "HTML Encoder",
    "description": "Escape text as HTML entities",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "developer"
  },
  {
    "slug": "html-decode",
    "name": "HTML Decoder",
    "description": "Turn &amp; and &#x27; back into characters",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "developer"
  },
  {
    "slug": "nanoid-generator",
    "name": "Nano ID Generator",
    "description": "Short, URL-safe random IDs with custom alphabets",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "developer"
  },
  {
    "slug": "sql-minifier",
    "name": "SQL Minifier",
    "description": "Collapse SQL onto a single line",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "developer"
  },
  {
    "slug": "yaml-formatter",
    "name": "YAML Formatter",
    "description": "Validate and format YAML, convert to JSON",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "developer"
  },
  {
    "slug": "xml-formatter",
    "name": "XML Formatter",
    "description": "Pretty-print, minify and validate XML",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "developer"
  },
  {
    "slug": "xml-validator",
    "name": "XML Validator",
    "description": "Check that XML is well-formed",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "developer"
  },
  {
    "slug": "cron-helper",
    "name": "Cron Expression Helper",
    "description": "Explain cron schedules and preview next runs",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "developer"
  },
  {
    "slug": "http-status",
    "name": "HTTP Status Codes",
    "description": "Every status code with meaning and usage",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "developer"
  },
  {
    "slug": "mime-lookup",
    "name": "MIME Type Lookup",
    "description": "Find the MIME type for an extension, or the reverse",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "developer"
  },
  {
    "slug": "user-agent",
    "name": "User-Agent Inspector",
    "description": "Parse browser, engine, OS and device from a UA string",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "developer"
  },
  {
    "slug": "browser-info",
    "name": "Browser Info",
    "description": "Screen, features and capabilities of this browser",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "developer"
  },
  {
    "slug": "keyboard-tester",
    "name": "Keyboard Inspector",
    "description": "See key, code and modifiers for any keypress, plus app shortcuts",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "developer"
  },
  {
    "slug": "hex-encoder",
    "name": "Hex Encoder",
    "description": "Text to hexadecimal UTF-8 bytes",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "developer"
  },
  {
    "slug": "hex-decoder",
    "name": "Hex Decoder",
    "description": "Hexadecimal bytes back to text",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "developer"
  },
  {
    "slug": "binary-converter",
    "name": "Text ⇄ Binary",
    "description": "Text to 8-bit binary and back",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "developer"
  },
  {
    "slug": "ascii-converter",
    "name": "Text ⇄ ASCII Codes",
    "description": "Characters to decimal byte values and back",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "developer"
  },
  {
    "slug": "octal-converter",
    "name": "Text ⇄ Octal",
    "description": "Characters to octal byte values",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "developer"
  },
  {
    "slug": "unicode-converter",
    "name": "Unicode Escape Converter",
    "description": "Text ⇄ \\u escapes, code points and back",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "developer"
  },
  {
    "slug": "code-point-converter",
    "name": "Text ⇄ Unicode Code Points",
    "description": "U+0041 notation for every character",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "developer"
  },
  {
    "slug": "base32-encoder",
    "name": "Base32 Encode / Decode",
    "description": "RFC 4648 Base32 (used by TOTP secrets)",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "developer"
  },
  {
    "slug": "rot13",
    "name": "ROT13",
    "description": "The classic letter-rotation cipher",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "developer"
  },
  {
    "slug": "morse-code",
    "name": "Morse Code Translator",
    "description": "Text ⇄ Morse code",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "developer"
  },
  {
    "slug": "unicode-inspector",
    "name": "Unicode Character Inspector",
    "description": "Code point, UTF-8/16 bytes and type of every character",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "developer"
  },
  {
    "slug": "url-parser",
    "name": "URL Parser",
    "description": "Break a URL into protocol, host, path, query and fragment",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "developer"
  },
  {
    "slug": "utm-cleaner",
    "name": "UTM Cleaner",
    "description": "Remove UTM campaign parameters from a link",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "developer"
  },
  {
    "slug": "query-string-builder",
    "name": "Query String Builder",
    "description": "Build properly encoded ?key=value strings",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "developer"
  },
  {
    "slug": "query-string-parser",
    "name": "Query String Parser",
    "description": "See every parameter in a URL, decoded",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "developer"
  },
  {
    "slug": "utm-builder",
    "name": "UTM Link Builder",
    "description": "Campaign URLs with utm_source, medium and campaign",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "developer"
  },
  {
    "slug": "http-client",
    "name": "HTTP Client",
    "description": "Send GET, POST, PUT, PATCH and DELETE requests from your browser",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "developer"
  },
  {
    "slug": "curl-converter",
    "name": "cURL Converter",
    "description": "Turn a cURL command into fetch, Axios, Python, Go or PHP",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "developer"
  },
  {
    "slug": "curl-generator",
    "name": "cURL Generator",
    "description": "Build a cURL command from a request form",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "developer"
  },
  {
    "slug": "fetch-generator",
    "name": "fetch() Code Generator",
    "description": "JavaScript fetch code for any request",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "developer"
  },
  {
    "slug": "axios-generator",
    "name": "Axios Code Generator",
    "description": "Axios request code for any request",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "developer"
  },
  {
    "slug": "httpie-generator",
    "name": "HTTPie Command Generator",
    "description": "HTTPie commands for any request",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "developer"
  },
  {
    "slug": "http-headers-reference",
    "name": "HTTP Headers Reference",
    "description": "What every common request and response header does",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "developer"
  },
  {
    "slug": "git-commands",
    "name": "Git Command Reference",
    "description": "Everyday git commands, with undo recipes",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "developer"
  },
  {
    "slug": "ascii-table",
    "name": "ASCII Table",
    "description": "All 128 ASCII characters with decimal, hex, octal and binary",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "developer"
  },
  {
    "slug": "gitignore-generator",
    "name": "Gitignore Generator",
    "description": "Combine templates for Node, Python, Go, Rust, Next.js, IDEs and OSes",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "developer"
  },
  {
    "slug": "conventional-commit",
    "name": "Conventional Commit Builder",
    "description": "Well-formed commit messages with type, scope and breaking changes",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "developer"
  },
  {
    "slug": "git-branch-name",
    "name": "Git Branch Name Generator",
    "description": "Clean branch names from a ticket and description",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "developer"
  },
  {
    "slug": "semver-calculator",
    "name": "SemVer Calculator",
    "description": "Parse, compare and bump versions; check npm ranges",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "developer"
  },
  {
    "slug": "semver-parser",
    "name": "SemVer Parser",
    "description": "Major, minor, patch, pre-release and build parts",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "developer"
  },
  {
    "slug": "github-url-parser",
    "name": "GitHub URL Parser",
    "description": "Owner, repo, branch and path — plus raw, clone and ZIP links",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "developer"
  },
  {
    "slug": "sql-insert-generator",
    "name": "SQL INSERT Generator",
    "description": "Batch INSERTs for PostgreSQL, MySQL, SQLite and SQL Server",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "developer"
  },
  {
    "slug": "sql-in-clause",
    "name": "SQL IN Clause Generator",
    "description": "Turn a list of values into IN (…)",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "developer"
  },
  {
    "slug": "mock-json",
    "name": "Mock JSON Generator",
    "description": "Synthetic JSON records from a schema",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "developer"
  },
  {
    "slug": "html-formatter",
    "name": "HTML Formatter",
    "description": "Beautify HTML with consistent indentation",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "developer"
  },
  {
    "slug": "html-minifier",
    "name": "HTML Minifier",
    "description": "Remove whitespace and comments from HTML",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "developer"
  },
  {
    "slug": "css-formatter",
    "name": "CSS Formatter",
    "description": "Beautify CSS rules and media queries",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "developer"
  },
  {
    "slug": "css-minifier",
    "name": "CSS Minifier",
    "description": "Smaller CSS with strings and comments handled safely",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "developer"
  },
  {
    "slug": "html-playground",
    "name": "HTML / CSS / JS Playground",
    "description": "Write code and see it run in a locked-down sandbox",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "developer"
  },
  {
    "slug": "css-playground",
    "name": "CSS Playground",
    "description": "Try CSS against live HTML",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "developer"
  },
  {
    "slug": "javascript-playground",
    "name": "JavaScript Playground",
    "description": "Run JavaScript with a console — no network access",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "developer"
  },
  {
    "slug": "regex-escape",
    "name": "Regex Escape",
    "description": "Escape special characters so text matches literally",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "developer"
  },
  {
    "slug": "regex-splitter",
    "name": "Regex Splitter",
    "description": "Split text on a regular expression",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "developer"
  },
  {
    "slug": "regex-match-extractor",
    "name": "Regex Match Extractor",
    "description": "Pull every match or capture group into a list",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "developer"
  },
  {
    "slug": "jwt-generator",
    "name": "JWT Generator / Signer",
    "description": "Sign JWTs with HS256, RS256, PS256, ES256 or EdDSA",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "developer"
  },
  {
    "slug": "subnet-calculator",
    "name": "Subnet / CIDR Calculator",
    "description": "Network, broadcast, host range and mask for any IPv4 CIDR",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "developer"
  },
  {
    "slug": "cidr-splitter",
    "name": "Subnet Splitter",
    "description": "Divide a network into equal smaller subnets",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "developer"
  },
  {
    "slug": "ip-range-to-cidr",
    "name": "IP Range to CIDR",
    "description": "The smallest set of CIDR blocks covering a range",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "developer"
  },
  {
    "slug": "ipv6-calculator",
    "name": "IPv6 Calculator",
    "description": "Compress, expand and analyse IPv6 addresses and prefixes",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "developer"
  },
  {
    "slug": "ip-converter",
    "name": "IP Address Converter",
    "description": "IPv4 as integer, hex, binary and IPv4-mapped IPv6",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "developer"
  },
  {
    "slug": "code-to-image",
    "name": "Code to Image",
    "description": "Beautiful highlighted code screenshots for slides and posts",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "developer"
  },
  {
    "slug": "unix-timestamp",
    "name": "Unix Timestamp",
    "description": "Current epoch time and conversions",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "developer"
  },
  {
    "slug": "camel-case",
    "name": "camelCase",
    "description": "Convert text to camelCase",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "developer"
  },
  {
    "slug": "pascal-case",
    "name": "PascalCase",
    "description": "Convert text to PascalCase",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "developer"
  },
  {
    "slug": "snake-case",
    "name": "snake_case",
    "description": "Convert text to snake_case",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "developer"
  },
  {
    "slug": "kebab-case",
    "name": "kebab-case",
    "description": "Convert text to kebab-case",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "developer"
  },
  {
    "slug": "whitespace-visualizer",
    "name": "Whitespace Visualizer",
    "description": "Reveal tabs, NBSPs and invisible characters",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "developer"
  },
  {
    "slug": "constant-case",
    "name": "CONSTANT_CASE",
    "description": "Convert text to CONSTANT_CASE",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "developer"
  },
  {
    "slug": "dot-case",
    "name": "dot.case",
    "description": "Convert text to dot.case",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "developer"
  },
  {
    "slug": "path-case",
    "name": "path/case",
    "description": "Convert text to path/case",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "developer"
  },
  {
    "slug": "lowercase",
    "name": "lowercase",
    "description": "Convert text to lowercase",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "developer"
  },
  {
    "slug": "uppercase",
    "name": "UPPERCASE",
    "description": "Convert text to UPPERCASE",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "developer"
  },
  {
    "slug": "title-case",
    "name": "Title Case",
    "description": "Convert text to Title Case",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "developer"
  },
  {
    "slug": "sentence-case",
    "name": "Sentence case",
    "description": "Convert text to Sentence case",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "developer"
  },
  {
    "slug": "clamp-generator",
    "name": "CSS clamp() Generator",
    "description": "Fluid font sizes and spacing between two viewport widths",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "developer"
  },
  {
    "slug": "hex-viewer",
    "name": "Hex Viewer",
    "description": "Raw bytes of any file in hex and ASCII, with search and an inspector",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "developer"
  },
  {
    "slug": "px-to-rem",
    "name": "px ⇄ rem / em Converter",
    "description": "Pixels to rem and em (and back) for any root size",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "developer"
  },
  {
    "slug": "viewport-calculator",
    "name": "Viewport Unit Calculator",
    "description": "vw, vh, vmin and vmax to pixels",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "developer"
  },
  {
    "slug": "grid-calculator",
    "name": "8px Grid Calculator",
    "description": "Snap sizes to an 8-point (or any) grid",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "developer"
  },
  {
    "slug": "golden-ratio",
    "name": "Golden Ratio Calculator",
    "description": "Split a size by φ and build a golden type scale",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "developer"
  },
  {
    "slug": "number-base-converter",
    "name": "Number Base Converter",
    "description": "Binary, octal, decimal, hex and any base 2–36 — any size",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "developer"
  },
  {
    "slug": "random-string",
    "name": "Random String Generator",
    "description": "Random strings from any character set",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "developer"
  },
  {
    "slug": "secret-generator",
    "name": "Secret Key Generator",
    "description": "256-bit keys as hex, Base64 or Base64URL",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "developer"
  },
  {
    "slug": "file-hash",
    "name": "File Hash / Checksum",
    "description": "SHA-256, SHA-384, SHA-512 and SHA-1 of any file — verify downloads",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "developer"
  },
  {
    "slug": "totp-generator",
    "name": "2FA Code Generator (TOTP)",
    "description": "Live authenticator codes from a secret or otpauth:// link, plus setup QR codes",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "developer"
  },
  {
    "slug": "key-pair-generator",
    "name": "Key Pair Generator",
    "description": "Ed25519, RSA and ECDSA keys as OpenSSH, PEM and JWK",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "developer"
  },
  {
    "slug": "ssh-key-generator",
    "name": "SSH Key Generator",
    "description": "id_ed25519 / id_rsa key pairs ready for ~/.ssh and GitHub",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "developer"
  },
  {
    "slug": "rsa-key-generator",
    "name": "RSA Key Generator",
    "description": "2048–4096-bit RSA keys in PEM (SPKI / PKCS#8)",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "developer"
  },
  {
    "slug": "og-image-maker",
    "name": "Open Graph Image (1200×630)",
    "description": "Link-preview images for websites and blogs",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "developer"
  },
  {
    "slug": "markdown-editor",
    "name": "Markdown Editor",
    "description": "Markdown Editor — free, private browser tool. Zero uploads.",
    "category": "text",
    "available": true,
    "iconColor": "text-blue-600",
    "jellykit": true,
    "sourceCategory": "text"
  },
  {
    "slug": "text-cleaner",
    "name": "Text Cleaner",
    "description": "Text Cleaner — free, private browser tool. Zero uploads.",
    "category": "text",
    "available": true,
    "iconColor": "text-blue-600",
    "jellykit": true,
    "sourceCategory": "text"
  },
  {
    "slug": "markdown-preview",
    "name": "Markdown Preview",
    "description": "Render a Markdown file full-width",
    "category": "text",
    "available": true,
    "iconColor": "text-blue-600",
    "jellykit": true,
    "sourceCategory": "text"
  },
  {
    "slug": "text-analyzer",
    "name": "Text Analyzer",
    "description": "Words, sentences, paragraphs, reading time",
    "category": "text",
    "available": true,
    "iconColor": "text-blue-600",
    "jellykit": true,
    "sourceCategory": "text"
  },
  {
    "slug": "character-counter",
    "name": "Character Counter",
    "description": "Characters with and without spaces, bytes",
    "category": "text",
    "available": true,
    "iconColor": "text-blue-600",
    "jellykit": true,
    "sourceCategory": "text"
  },
  {
    "slug": "reading-time",
    "name": "Reading Time",
    "description": "Estimate reading and speaking time",
    "category": "text",
    "available": true,
    "iconColor": "text-blue-600",
    "jellykit": true,
    "sourceCategory": "text"
  },
  {
    "slug": "remove-duplicate-lines",
    "name": "Remove Duplicate Lines",
    "description": "Keep the first of every repeated line",
    "category": "text",
    "available": true,
    "iconColor": "text-blue-600",
    "jellykit": true,
    "sourceCategory": "text"
  },
  {
    "slug": "reverse-lines",
    "name": "Reverse Lines",
    "description": "Flip the order of lines",
    "category": "text",
    "available": true,
    "iconColor": "text-blue-600",
    "jellykit": true,
    "sourceCategory": "text"
  },
  {
    "slug": "remove-empty-lines",
    "name": "Remove Empty Lines",
    "description": "Delete blank lines",
    "category": "text",
    "available": true,
    "iconColor": "text-blue-600",
    "jellykit": true,
    "sourceCategory": "text"
  },
  {
    "slug": "extract-urls",
    "name": "Extract URLs",
    "description": "Pull every link out of text",
    "category": "text",
    "available": true,
    "iconColor": "text-blue-600",
    "jellykit": true,
    "sourceCategory": "text"
  },
  {
    "slug": "extract-emails",
    "name": "Extract Emails",
    "description": "Find every email address",
    "category": "text",
    "available": true,
    "iconColor": "text-blue-600",
    "jellykit": true,
    "sourceCategory": "text"
  },
  {
    "slug": "extract-hashtags",
    "name": "Extract Hashtags",
    "description": "Collect #hashtags from posts",
    "category": "text",
    "available": true,
    "iconColor": "text-blue-600",
    "jellykit": true,
    "sourceCategory": "text"
  },
  {
    "slug": "extract-mentions",
    "name": "Extract Mentions",
    "description": "Collect @mentions from posts",
    "category": "text",
    "available": true,
    "iconColor": "text-blue-600",
    "jellykit": true,
    "sourceCategory": "text"
  },
  {
    "slug": "text-diff",
    "name": "Text Diff",
    "description": "Compare two versions of any text",
    "category": "text",
    "available": true,
    "iconColor": "text-blue-600",
    "jellykit": true,
    "sourceCategory": "text"
  },
  {
    "slug": "line-numbers",
    "name": "Line Numbers",
    "description": "Add or remove line numbers",
    "category": "text",
    "available": true,
    "iconColor": "text-blue-600",
    "jellykit": true,
    "sourceCategory": "text"
  },
  {
    "slug": "html-to-markdown",
    "name": "HTML to Markdown",
    "description": "Convert HTML (sanitized first) into Markdown",
    "category": "text",
    "available": true,
    "iconColor": "text-blue-600",
    "jellykit": true,
    "sourceCategory": "text"
  },
  {
    "slug": "markdown-toc",
    "name": "Markdown TOC Generator",
    "description": "Table of contents with GitHub-style anchors",
    "category": "text",
    "available": true,
    "iconColor": "text-blue-600",
    "jellykit": true,
    "sourceCategory": "text"
  },
  {
    "slug": "markdown-link-extractor",
    "name": "Markdown Link Extractor",
    "description": "Every link, image and reference in a Markdown file",
    "category": "text",
    "available": true,
    "iconColor": "text-blue-600",
    "jellykit": true,
    "sourceCategory": "text"
  },
  {
    "slug": "markdown-formatter",
    "name": "Markdown Formatter",
    "description": "Consistent headings, bullets and spacing",
    "category": "text",
    "available": true,
    "iconColor": "text-blue-600",
    "jellykit": true,
    "sourceCategory": "text"
  },
  {
    "slug": "duplicate-word-finder",
    "name": "Duplicate Word Finder",
    "description": "Overused words and accidental doubles like “the the”",
    "category": "text",
    "available": true,
    "iconColor": "text-blue-600",
    "jellykit": true,
    "sourceCategory": "text"
  },
  {
    "slug": "repeated-phrase-finder",
    "name": "Repeated Phrase Finder",
    "description": "Phrases you used more than once",
    "category": "text",
    "available": true,
    "iconColor": "text-blue-600",
    "jellykit": true,
    "sourceCategory": "text"
  },
  {
    "slug": "shuffle-lines",
    "name": "Shuffle Lines",
    "description": "Randomize the order of lines",
    "category": "text",
    "available": true,
    "iconColor": "text-blue-600",
    "jellykit": true,
    "sourceCategory": "text"
  },
  {
    "slug": "trim-whitespace",
    "name": "Trim Whitespace",
    "description": "Remove spaces at the start and end of every line",
    "category": "text",
    "available": true,
    "iconColor": "text-blue-600",
    "jellykit": true,
    "sourceCategory": "text"
  },
  {
    "slug": "remove-extra-spaces",
    "name": "Remove Extra Spaces",
    "description": "Collapse runs of spaces into one",
    "category": "text",
    "available": true,
    "iconColor": "text-blue-600",
    "jellykit": true,
    "sourceCategory": "text"
  },
  {
    "slug": "strip-html-tags",
    "name": "Strip HTML Tags",
    "description": "Plain text from HTML markup",
    "category": "text",
    "available": true,
    "iconColor": "text-blue-600",
    "jellykit": true,
    "sourceCategory": "text"
  },
  {
    "slug": "smart-quotes",
    "name": "Smart Quotes to Straight",
    "description": "Replace curly quotes and apostrophes with straight ones",
    "category": "text",
    "available": true,
    "iconColor": "text-blue-600",
    "jellykit": true,
    "sourceCategory": "text"
  },
  {
    "slug": "extract-numbers",
    "name": "Extract Numbers",
    "description": "Pull every number out of text",
    "category": "text",
    "available": true,
    "iconColor": "text-blue-600",
    "jellykit": true,
    "sourceCategory": "text"
  },
  {
    "slug": "extract-phone-numbers",
    "name": "Extract Phone Numbers",
    "description": "Find phone numbers in text",
    "category": "text",
    "available": true,
    "iconColor": "text-blue-600",
    "jellykit": true,
    "sourceCategory": "text"
  },
  {
    "slug": "sentence-counter",
    "name": "Sentence Counter",
    "description": "Sentences, average length and readability",
    "category": "text",
    "available": true,
    "iconColor": "text-blue-600",
    "jellykit": true,
    "sourceCategory": "text"
  },
  {
    "slug": "paragraph-counter",
    "name": "Paragraph Counter",
    "description": "How many paragraphs, words per paragraph",
    "category": "text",
    "available": true,
    "iconColor": "text-blue-600",
    "jellykit": true,
    "sourceCategory": "text"
  },
  {
    "slug": "line-counter",
    "name": "Line Counter",
    "description": "Lines, blank lines and the longest line",
    "category": "text",
    "available": true,
    "iconColor": "text-blue-600",
    "jellykit": true,
    "sourceCategory": "text"
  },
  {
    "slug": "markdown-diff",
    "name": "Markdown Diff",
    "description": "Compare two Markdown documents line by line",
    "category": "text",
    "available": true,
    "iconColor": "text-blue-600",
    "jellykit": true,
    "sourceCategory": "text"
  },
  {
    "slug": "fancy-text-generator",
    "name": "Fancy Text Generator",
    "description": "30 Unicode styles — bold, script, bubbles, upside-down — that paste anywhere",
    "category": "text",
    "available": true,
    "iconColor": "text-blue-600",
    "jellykit": true,
    "sourceCategory": "text"
  },
  {
    "slug": "bold-text-generator",
    "name": "Bold Text Generator",
    "description": "𝐁𝐨𝐥𝐝 Unicode text for posts and bios",
    "category": "text",
    "available": true,
    "iconColor": "text-blue-600",
    "jellykit": true,
    "sourceCategory": "text"
  },
  {
    "slug": "italic-text-generator",
    "name": "Italic Text Generator",
    "description": "𝘐𝘵𝘢𝘭𝘪𝘤 Unicode text that pastes anywhere",
    "category": "text",
    "available": true,
    "iconColor": "text-blue-600",
    "jellykit": true,
    "sourceCategory": "text"
  },
  {
    "slug": "cursive-text-generator",
    "name": "Cursive Text Generator",
    "description": "𝒮𝒸𝓇𝒾𝓅𝓉 and cursive Unicode letters",
    "category": "text",
    "available": true,
    "iconColor": "text-blue-600",
    "jellykit": true,
    "sourceCategory": "text"
  },
  {
    "slug": "strikethrough-text",
    "name": "Strikethrough Text",
    "description": "S̶t̶r̶i̶k̶e̶ through text with combining marks",
    "category": "text",
    "available": true,
    "iconColor": "text-blue-600",
    "jellykit": true,
    "sourceCategory": "text"
  },
  {
    "slug": "upside-down-text",
    "name": "Upside Down Text",
    "description": "Flip text upside down (ʇxǝʇ uʍop ǝpısdn)",
    "category": "text",
    "available": true,
    "iconColor": "text-blue-600",
    "jellykit": true,
    "sourceCategory": "text"
  },
  {
    "slug": "small-caps-text",
    "name": "Small Caps Text",
    "description": "sᴍᴀʟʟ ᴄᴀᴘs Unicode text",
    "category": "text",
    "available": true,
    "iconColor": "text-blue-600",
    "jellykit": true,
    "sourceCategory": "text"
  },
  {
    "slug": "bubble-text",
    "name": "Bubble Text",
    "description": "Ⓒⓘⓡⓒⓛⓔⓓ and squared letters",
    "category": "text",
    "available": true,
    "iconColor": "text-blue-600",
    "jellykit": true,
    "sourceCategory": "text"
  },
  {
    "slug": "fancy-to-plain-text",
    "name": "Fancy Text to Plain Text",
    "description": "Turn Unicode-styled text back into normal letters",
    "category": "text",
    "available": true,
    "iconColor": "text-blue-600",
    "jellykit": true,
    "sourceCategory": "text"
  },
  {
    "slug": "text-redactor",
    "name": "Text Redactor",
    "description": "Black out emails, phone numbers, cards and names",
    "category": "text",
    "available": true,
    "iconColor": "text-blue-600",
    "jellykit": true,
    "sourceCategory": "text"
  },
  {
    "slug": "encrypt-text",
    "name": "Encrypt Text",
    "description": "Turn a message into password-protected Base64",
    "category": "text",
    "available": true,
    "iconColor": "text-blue-600",
    "jellykit": true,
    "sourceCategory": "text"
  },
  {
    "slug": "decrypt-text",
    "name": "Decrypt Text",
    "description": "Read a message encrypted with Encrypt Text",
    "category": "text",
    "available": true,
    "iconColor": "text-blue-600",
    "jellykit": true,
    "sourceCategory": "text"
  },
  {
    "slug": "svg-tools",
    "name": "SVG Viewer",
    "description": "SVG Viewer — free, private browser tool. Zero uploads.",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "design"
  },
  {
    "slug": "palette-generator",
    "name": "Palette Generator",
    "description": "Harmonies, shades, tints and full scales",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "design"
  },
  {
    "slug": "css-shadow",
    "name": "Shadow Generator",
    "description": "Layered CSS box-shadows with live preview",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "design"
  },
  {
    "slug": "border-radius",
    "name": "Border Radius",
    "description": "Per-corner border-radius CSS",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "design"
  },
  {
    "slug": "type-scale",
    "name": "Type Scale",
    "description": "Modular typographic scale as CSS",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "design"
  },
  {
    "slug": "font-pairing",
    "name": "Font Pairing",
    "description": "Try heading and body font combinations",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "design"
  },
  {
    "slug": "font-inspector",
    "name": "Font Preview",
    "description": "Preview local font files and type specimens",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "design"
  },
  {
    "slug": "svg-inspector",
    "name": "SVG Inspector",
    "description": "viewBox, dimensions, elements and safety report",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "design"
  },
  {
    "slug": "spacing-calculator",
    "name": "Spacing Calculator",
    "description": "px ⇄ rem and spacing scales as CSS tokens",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "design"
  },
  {
    "slug": "text-shadow-generator",
    "name": "Text Shadow Generator",
    "description": "Layered, 3D and neo-brutal text shadows",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "design"
  },
  {
    "slug": "glassmorphism-generator",
    "name": "Glassmorphism Generator",
    "description": "Frosted-glass cards with backdrop blur",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "design"
  },
  {
    "slug": "neumorphism-generator",
    "name": "Neumorphism Generator",
    "description": "Soft UI surfaces: flat, concave, convex, pressed",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "design"
  },
  {
    "slug": "neo-brutalism-generator",
    "name": "Neo-Brutalism Generator",
    "description": "Thick borders, hard shadows and tactile states",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "design"
  },
  {
    "slug": "css-button-generator",
    "name": "CSS Button Generator",
    "description": "Solid, outline, soft and neo-brutal buttons with hover states",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "design"
  },
  {
    "slug": "css-blob-generator",
    "name": "CSS Blob Generator",
    "description": "Organic blob shapes with pure border-radius",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "design"
  },
  {
    "slug": "css-noise-generator",
    "name": "CSS Noise Generator",
    "description": "Grain texture as a tiny inline SVG",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "design"
  },
  {
    "slug": "responsive-font-calculator",
    "name": "Responsive Font Calculator",
    "description": "Font size that scales with the viewport — as clamp()",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "design"
  },
  {
    "slug": "aspect-ratio",
    "name": "Aspect Ratio Calculator",
    "description": "Calculate and scale dimensions by ratio",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "design"
  },
  {
    "slug": "dpi-calculator",
    "name": "DPI & Print Size",
    "description": "Pixels, inches and DPI for printing",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "design"
  },
  {
    "slug": "file-inspector",
    "name": "File Inspector",
    "description": "File Inspector — free, private browser tool. Zero uploads.",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "files"
  },
  {
    "slug": "zip-tool",
    "name": "ZIP Extractor",
    "description": "ZIP Extractor — free, private browser tool. Zero uploads.",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "files"
  },
  {
    "slug": "zip-create",
    "name": "ZIP Creator",
    "description": "Bundle files and folders into a ZIP",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "files"
  },
  {
    "slug": "file-type-detector",
    "name": "File Type Detector",
    "description": "Identify a file by its contents, not its name",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "files"
  },
  {
    "slug": "file-size-analyzer",
    "name": "File Size Analyzer",
    "description": "See what takes up space in a folder",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "files"
  },
  {
    "slug": "batch-rename",
    "name": "Batch Rename",
    "description": "Rename many files with patterns, then download as ZIP",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "files"
  },
  {
    "slug": "duplicate-files",
    "name": "Duplicate File Finder",
    "description": "Find identical files by content hash",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "files"
  },
  {
    "slug": "file-compare",
    "name": "File Compare",
    "description": "Check whether two files are byte-for-byte identical",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "files"
  },
  {
    "slug": "folder-inspector",
    "name": "Folder Overview",
    "description": "Count files by type across a dropped folder",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "files"
  },
  {
    "slug": "zip-browser",
    "name": "Archive Browser",
    "description": "Look inside ZIP files without extracting",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "files"
  },
  {
    "slug": "encrypt-file",
    "name": "Encrypt File",
    "description": "Lock any file with a password (AES-256-GCM)",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "files"
  },
  {
    "slug": "decrypt-file",
    "name": "Decrypt File",
    "description": "Open a .enc file encrypted with Encrypt File",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "files"
  },
  {
    "slug": "unit-converter",
    "name": "Unit Converter",
    "description": "Unit Converter — free, private browser tool. Zero uploads.",
    "category": "calc",
    "available": true,
    "iconColor": "text-emerald-600",
    "jellykit": true,
    "sourceCategory": "utilities"
  },
  {
    "slug": "compound-interest",
    "name": "Compound Interest",
    "description": "Compound Interest — free, private browser tool. Zero uploads.",
    "category": "calc",
    "available": true,
    "iconColor": "text-emerald-600",
    "jellykit": true,
    "sourceCategory": "utilities"
  },
  {
    "slug": "length-converter",
    "name": "Length Converter",
    "description": "Convert length units instantly",
    "category": "calc",
    "available": true,
    "iconColor": "text-emerald-600",
    "jellykit": true,
    "sourceCategory": "utilities"
  },
  {
    "slug": "weight-converter",
    "name": "Weight Converter",
    "description": "Convert weight units instantly",
    "category": "calc",
    "available": true,
    "iconColor": "text-emerald-600",
    "jellykit": true,
    "sourceCategory": "utilities"
  },
  {
    "slug": "temperature-converter",
    "name": "Temperature Converter",
    "description": "Convert temperature units instantly",
    "category": "calc",
    "available": true,
    "iconColor": "text-emerald-600",
    "jellykit": true,
    "sourceCategory": "utilities"
  },
  {
    "slug": "speed-converter",
    "name": "Speed Converter",
    "description": "Convert speed units instantly",
    "category": "calc",
    "available": true,
    "iconColor": "text-emerald-600",
    "jellykit": true,
    "sourceCategory": "utilities"
  },
  {
    "slug": "area-converter",
    "name": "Area Converter",
    "description": "Convert area units instantly",
    "category": "calc",
    "available": true,
    "iconColor": "text-emerald-600",
    "jellykit": true,
    "sourceCategory": "utilities"
  },
  {
    "slug": "volume-converter",
    "name": "Volume Converter",
    "description": "Convert volume units instantly",
    "category": "calc",
    "available": true,
    "iconColor": "text-emerald-600",
    "jellykit": true,
    "sourceCategory": "utilities"
  },
  {
    "slug": "bytes-converter",
    "name": "Bytes Converter",
    "description": "Convert bytes units instantly",
    "category": "calc",
    "available": true,
    "iconColor": "text-emerald-600",
    "jellykit": true,
    "sourceCategory": "utilities"
  },
  {
    "slug": "percentage-change",
    "name": "Percentage Change",
    "description": "Increase or decrease between two values",
    "category": "calc",
    "available": true,
    "iconColor": "text-emerald-600",
    "jellykit": true,
    "sourceCategory": "utilities"
  },
  {
    "slug": "ratio-calculator",
    "name": "Ratio Calculator",
    "description": "Simplify ratios and solve a : b = c : x",
    "category": "calc",
    "available": true,
    "iconColor": "text-emerald-600",
    "jellykit": true,
    "sourceCategory": "utilities"
  },
  {
    "slug": "cagr-calculator",
    "name": "CAGR Calculator",
    "description": "Compound annual growth rate between two values",
    "category": "calc",
    "available": true,
    "iconColor": "text-emerald-600",
    "jellykit": true,
    "sourceCategory": "utilities"
  },
  {
    "slug": "loan-calculator",
    "name": "Loan Calculator",
    "description": "Monthly payment, total interest and amortization",
    "category": "calc",
    "available": true,
    "iconColor": "text-emerald-600",
    "jellykit": true,
    "sourceCategory": "utilities"
  },
  {
    "slug": "emi-calculator",
    "name": "EMI Calculator",
    "description": "Equated monthly installment for any loan",
    "category": "calc",
    "available": true,
    "iconColor": "text-emerald-600",
    "jellykit": true,
    "sourceCategory": "utilities"
  },
  {
    "slug": "time-calculator",
    "name": "Time Calculator",
    "description": "Add and subtract hours, minutes and seconds",
    "category": "calc",
    "available": true,
    "iconColor": "text-emerald-600",
    "jellykit": true,
    "sourceCategory": "utilities"
  },
  {
    "slug": "date-difference",
    "name": "Date Difference",
    "description": "Days, weeks and business days between dates",
    "category": "calc",
    "available": true,
    "iconColor": "text-emerald-600",
    "jellykit": true,
    "sourceCategory": "utilities"
  },
  {
    "slug": "timezone-converter",
    "name": "Time Zone Converter",
    "description": "Compare a moment across time zones",
    "category": "calc",
    "available": true,
    "iconColor": "text-emerald-600",
    "jellykit": true,
    "sourceCategory": "utilities"
  },
  {
    "slug": "resolution-calculator",
    "name": "Resolution Calculator",
    "description": "Megapixels, aspect ratio and pixel density",
    "category": "calc",
    "available": true,
    "iconColor": "text-emerald-600",
    "jellykit": true,
    "sourceCategory": "utilities"
  },
  {
    "slug": "scientific-calculator",
    "name": "Scientific Calculator",
    "description": "Trigonometry, logs, powers, factorials and history",
    "category": "calc",
    "available": true,
    "iconColor": "text-emerald-600",
    "jellykit": true,
    "sourceCategory": "utilities"
  },
  {
    "slug": "simple-interest",
    "name": "Simple Interest",
    "description": "Interest on a principal without compounding",
    "category": "calc",
    "available": true,
    "iconColor": "text-emerald-600",
    "jellykit": true,
    "sourceCategory": "utilities"
  },
  {
    "slug": "sip-calculator",
    "name": "SIP Calculator",
    "description": "Future value of a monthly investment plan",
    "category": "calc",
    "available": true,
    "iconColor": "text-emerald-600",
    "jellykit": true,
    "sourceCategory": "utilities"
  },
  {
    "slug": "inflation-calculator",
    "name": "Inflation Calculator",
    "description": "Future cost and purchasing power over time",
    "category": "calc",
    "available": true,
    "iconColor": "text-emerald-600",
    "jellykit": true,
    "sourceCategory": "utilities"
  },
  {
    "slug": "savings-goal",
    "name": "Savings Goal Calculator",
    "description": "How long until you reach a savings target",
    "category": "calc",
    "available": true,
    "iconColor": "text-emerald-600",
    "jellykit": true,
    "sourceCategory": "utilities"
  },
  {
    "slug": "rule-of-72",
    "name": "Rule of 72",
    "description": "Years for an investment to double",
    "category": "calc",
    "available": true,
    "iconColor": "text-emerald-600",
    "jellykit": true,
    "sourceCategory": "utilities"
  },
  {
    "slug": "unit-price",
    "name": "Unit Price Comparison",
    "description": "Which pack is better value per gram, ml or piece",
    "category": "calc",
    "available": true,
    "iconColor": "text-emerald-600",
    "jellykit": true,
    "sourceCategory": "utilities"
  },
  {
    "slug": "vat-calculator",
    "name": "VAT / GST / Sales Tax",
    "description": "Add or remove tax from a price",
    "category": "calc",
    "available": true,
    "iconColor": "text-emerald-600",
    "jellykit": true,
    "sourceCategory": "utilities"
  },
  {
    "slug": "average-calculator",
    "name": "Average Calculator",
    "description": "Mean, sum and count of a list of numbers",
    "category": "calc",
    "available": true,
    "iconColor": "text-emerald-600",
    "jellykit": true,
    "sourceCategory": "utilities"
  },
  {
    "slug": "weighted-average",
    "name": "Weighted Average",
    "description": "Average where each value has a weight",
    "category": "calc",
    "available": true,
    "iconColor": "text-emerald-600",
    "jellykit": true,
    "sourceCategory": "utilities"
  },
  {
    "slug": "prime-checker",
    "name": "Prime Number Checker",
    "description": "Is it prime? Prime factorization and the next prime",
    "category": "calc",
    "available": true,
    "iconColor": "text-emerald-600",
    "jellykit": true,
    "sourceCategory": "utilities"
  },
  {
    "slug": "gcd-lcm",
    "name": "GCD & LCM Calculator",
    "description": "Greatest common divisor and least common multiple",
    "category": "calc",
    "available": true,
    "iconColor": "text-emerald-600",
    "jellykit": true,
    "sourceCategory": "utilities"
  },
  {
    "slug": "factorial-calculator",
    "name": "Factorial Calculator",
    "description": "Exact n! for large numbers",
    "category": "calc",
    "available": true,
    "iconColor": "text-emerald-600",
    "jellykit": true,
    "sourceCategory": "utilities"
  },
  {
    "slug": "exponent-calculator",
    "name": "Exponent & Root Calculator",
    "description": "Powers and nth roots",
    "category": "calc",
    "available": true,
    "iconColor": "text-emerald-600",
    "jellykit": true,
    "sourceCategory": "utilities"
  },
  {
    "slug": "logarithm-calculator",
    "name": "Logarithm Calculator",
    "description": "log in any base, ln and log₂",
    "category": "calc",
    "available": true,
    "iconColor": "text-emerald-600",
    "jellykit": true,
    "sourceCategory": "utilities"
  },
  {
    "slug": "modulo-calculator",
    "name": "Modulo Calculator",
    "description": "Modulo vs. remainder, and the integer quotient",
    "category": "calc",
    "available": true,
    "iconColor": "text-emerald-600",
    "jellykit": true,
    "sourceCategory": "utilities"
  },
  {
    "slug": "quadratic-solver",
    "name": "Quadratic Equation Solver",
    "description": "Real and complex roots of ax² + bx + c",
    "category": "calc",
    "available": true,
    "iconColor": "text-emerald-600",
    "jellykit": true,
    "sourceCategory": "utilities"
  },
  {
    "slug": "fraction-calculator",
    "name": "Fraction Calculator",
    "description": "Add, subtract, multiply and divide fractions",
    "category": "calc",
    "available": true,
    "iconColor": "text-emerald-600",
    "jellykit": true,
    "sourceCategory": "utilities"
  },
  {
    "slug": "split-bill",
    "name": "Split Bill Calculator",
    "description": "Split a bill and tip between people",
    "category": "calc",
    "available": true,
    "iconColor": "text-emerald-600",
    "jellykit": true,
    "sourceCategory": "utilities"
  },
  {
    "slug": "proportion-calculator",
    "name": "Proportion Calculator",
    "description": "Solve a : b = c : x and simplify ratios",
    "category": "calc",
    "available": true,
    "iconColor": "text-emerald-600",
    "jellykit": true,
    "sourceCategory": "utilities"
  },
  {
    "slug": "world-clock",
    "name": "World Clock",
    "description": "Current time across cities and time zones",
    "category": "calc",
    "available": true,
    "iconColor": "text-emerald-600",
    "jellykit": true,
    "sourceCategory": "utilities"
  },
  {
    "slug": "wifi-qr",
    "name": "Wi-Fi QR Code",
    "description": "Let guests join your Wi-Fi by scanning",
    "category": "calc",
    "available": true,
    "iconColor": "text-emerald-600",
    "jellykit": true,
    "sourceCategory": "utilities"
  },
  {
    "slug": "vcard-qr",
    "name": "Contact QR Code (vCard)",
    "description": "A scannable business card",
    "category": "calc",
    "available": true,
    "iconColor": "text-emerald-600",
    "jellykit": true,
    "sourceCategory": "utilities"
  },
  {
    "slug": "barcode-generator",
    "name": "Barcode Generator",
    "description": "Code 128, EAN-13, UPC-A, EAN-8 and Code 39",
    "category": "calc",
    "available": true,
    "iconColor": "text-emerald-600",
    "jellykit": true,
    "sourceCategory": "utilities"
  },
  {
    "slug": "ean-barcode",
    "name": "EAN-13 Barcode",
    "description": "Retail product barcodes with automatic check digit",
    "category": "calc",
    "available": true,
    "iconColor": "text-emerald-600",
    "jellykit": true,
    "sourceCategory": "utilities"
  },
  {
    "slug": "upc-barcode",
    "name": "UPC-A Barcode",
    "description": "US/Canada retail barcodes",
    "category": "calc",
    "available": true,
    "iconColor": "text-emerald-600",
    "jellykit": true,
    "sourceCategory": "utilities"
  },
  {
    "slug": "week-number",
    "name": "Week Number",
    "description": "ISO week number, day of year and week date ranges",
    "category": "calc",
    "available": true,
    "iconColor": "text-emerald-600",
    "jellykit": true,
    "sourceCategory": "utilities"
  },
  {
    "slug": "iso-8601-formatter",
    "name": "ISO 8601 Formatter",
    "description": "A date in ISO 8601, RFC 2822, Unix and more",
    "category": "calc",
    "available": true,
    "iconColor": "text-emerald-600",
    "jellykit": true,
    "sourceCategory": "utilities"
  },
  {
    "slug": "relative-time",
    "name": "Relative Time",
    "description": "“3 days ago” or “in 2 hours” for any date",
    "category": "calc",
    "available": true,
    "iconColor": "text-emerald-600",
    "jellykit": true,
    "sourceCategory": "utilities"
  },
  {
    "slug": "countdown-timer",
    "name": "Countdown",
    "description": "Live countdown to (or time since) any date",
    "category": "calc",
    "available": true,
    "iconColor": "text-emerald-600",
    "jellykit": true,
    "sourceCategory": "utilities"
  },
  {
    "slug": "duration-calculator",
    "name": "Duration Calculator",
    "description": "Add durations like 1h 30m + 2:20:00, convert to ISO 8601",
    "category": "calc",
    "available": true,
    "iconColor": "text-emerald-600",
    "jellykit": true,
    "sourceCategory": "utilities"
  },
  {
    "slug": "working-days",
    "name": "Working Days Calculator",
    "description": "Business days between dates, skipping weekends and holidays",
    "category": "calc",
    "available": true,
    "iconColor": "text-emerald-600",
    "jellykit": true,
    "sourceCategory": "utilities"
  },
  {
    "slug": "add-days",
    "name": "Add / Subtract Days",
    "description": "The date N days before or after another",
    "category": "calc",
    "available": true,
    "iconColor": "text-emerald-600",
    "jellykit": true,
    "sourceCategory": "utilities"
  },
  {
    "slug": "random-number",
    "name": "Random Number Generator",
    "description": "Secure random numbers in any range, unique or sorted",
    "category": "calc",
    "available": true,
    "iconColor": "text-emerald-600",
    "jellykit": true,
    "sourceCategory": "utilities"
  },
  {
    "slug": "random-color",
    "name": "Random Color Generator",
    "description": "Random colors with HEX, RGB and HSL",
    "category": "calc",
    "available": true,
    "iconColor": "text-emerald-600",
    "jellykit": true,
    "sourceCategory": "utilities"
  },
  {
    "slug": "random-name",
    "name": "Random Name Generator",
    "description": "Made-up names and usernames for testing",
    "category": "calc",
    "available": true,
    "iconColor": "text-emerald-600",
    "jellykit": true,
    "sourceCategory": "utilities"
  },
  {
    "slug": "dice-roller",
    "name": "Dice Roller & Coin Flip",
    "description": "Roll any dice (d4–d100) or flip a coin",
    "category": "calc",
    "available": true,
    "iconColor": "text-emerald-600",
    "jellykit": true,
    "sourceCategory": "utilities"
  },
  {
    "slug": "roman-numerals",
    "name": "Roman Numeral Converter",
    "description": "Numbers to Roman numerals and back (1–3999)",
    "category": "calc",
    "available": true,
    "iconColor": "text-emerald-600",
    "jellykit": true,
    "sourceCategory": "utilities"
  },
  {
    "slug": "number-to-words",
    "name": "Number to Words",
    "description": "Write any number out in English words",
    "category": "calc",
    "available": true,
    "iconColor": "text-emerald-600",
    "jellykit": true,
    "sourceCategory": "utilities"
  },
  {
    "slug": "amount-in-words",
    "name": "Amount in Words (Cheque Writer)",
    "description": "Money amounts written out for cheques and invoices",
    "category": "calc",
    "available": true,
    "iconColor": "text-emerald-600",
    "jellykit": true,
    "sourceCategory": "utilities"
  },
  {
    "slug": "stopwatch",
    "name": "Stopwatch",
    "description": "Precise stopwatch with lap times",
    "category": "calc",
    "available": true,
    "iconColor": "text-emerald-600",
    "jellykit": true,
    "sourceCategory": "utilities"
  },
  {
    "slug": "timer",
    "name": "Countdown Timer",
    "description": "Minutes-and-seconds timer with an alarm",
    "category": "calc",
    "available": true,
    "iconColor": "text-emerald-600",
    "jellykit": true,
    "sourceCategory": "utilities"
  },
  {
    "slug": "calorie-calculator",
    "name": "Calorie Calculator (TDEE)",
    "description": "Daily calories to maintain, lose or gain weight",
    "category": "calc",
    "available": true,
    "iconColor": "text-emerald-600",
    "jellykit": true,
    "sourceCategory": "utilities"
  },
  {
    "slug": "fuel-cost-calculator",
    "name": "Fuel Cost Calculator",
    "description": "Trip fuel cost from distance, economy and price",
    "category": "calc",
    "available": true,
    "iconColor": "text-emerald-600",
    "jellykit": true,
    "sourceCategory": "utilities"
  },
  {
    "slug": "electricity-cost-calculator",
    "name": "Electricity Cost Calculator",
    "description": "Running cost of a device per day, month and year",
    "category": "calc",
    "available": true,
    "iconColor": "text-emerald-600",
    "jellykit": true,
    "sourceCategory": "utilities"
  },
  {
    "slug": "pace-calculator",
    "name": "Running Pace Calculator",
    "description": "Pace, speed and race-time predictions",
    "category": "calc",
    "available": true,
    "iconColor": "text-emerald-600",
    "jellykit": true,
    "sourceCategory": "utilities"
  },
  {
    "slug": "tone-generator",
    "name": "Tone Generator",
    "description": "Sine, square, saw and triangle tones at any frequency",
    "category": "calc",
    "available": true,
    "iconColor": "text-emerald-600",
    "jellykit": true,
    "sourceCategory": "utilities"
  },
  {
    "slug": "noise-generator",
    "name": "White / Pink / Brown Noise",
    "description": "Noise for focus, sleep or acoustic testing",
    "category": "calc",
    "available": true,
    "iconColor": "text-emerald-600",
    "jellykit": true,
    "sourceCategory": "utilities"
  },
  {
    "slug": "metronome",
    "name": "Metronome",
    "description": "Accurate clicks with accents, 30–260 BPM",
    "category": "calc",
    "available": true,
    "iconColor": "text-emerald-600",
    "jellykit": true,
    "sourceCategory": "utilities"
  },
  {
    "slug": "salary-calculator",
    "name": "Hourly ↔ Annual Salary",
    "description": "Convert between hourly, weekly, monthly and yearly pay",
    "category": "calc",
    "available": true,
    "iconColor": "text-emerald-600",
    "jellykit": true,
    "sourceCategory": "utilities"
  },
  {
    "slug": "roi-calculator",
    "name": "ROI Calculator",
    "description": "Return on investment, with annualized return",
    "category": "calc",
    "available": true,
    "iconColor": "text-emerald-600",
    "jellykit": true,
    "sourceCategory": "utilities"
  },
  {
    "slug": "freelance-rate-calculator",
    "name": "Freelance Rate Calculator",
    "description": "Hourly and day rate from your income goal, costs and tax",
    "category": "calc",
    "available": true,
    "iconColor": "text-emerald-600",
    "jellykit": true,
    "sourceCategory": "utilities"
  },
  {
    "slug": "invoice-generator",
    "name": "Invoice Generator",
    "description": "Invoice Generator — free, private browser tool. Zero uploads.",
    "category": "finance",
    "available": true,
    "iconColor": "text-emerald-600",
    "jellykit": true,
    "sourceCategory": "business"
  },
  {
    "slug": "receipt-generator",
    "name": "Receipt Generator",
    "description": "Receipt Generator — free, private browser tool. Zero uploads.",
    "category": "finance",
    "available": true,
    "iconColor": "text-emerald-600",
    "jellykit": true,
    "sourceCategory": "business"
  },
  {
    "slug": "quote-generator",
    "name": "Quote / Estimate Generator",
    "description": "Quote / Estimate Generator — free, private browser tool. Zero uploads.",
    "category": "finance",
    "available": true,
    "iconColor": "text-emerald-600",
    "jellykit": true,
    "sourceCategory": "business"
  },
  {
    "slug": "bill-generator",
    "name": "Simple Bill Generator",
    "description": "A quick bill for a customer",
    "category": "finance",
    "available": true,
    "iconColor": "text-emerald-600",
    "jellykit": true,
    "sourceCategory": "business"
  },
  {
    "slug": "expense-report",
    "name": "Expense Report",
    "description": "Itemized expenses for reimbursement",
    "category": "finance",
    "available": true,
    "iconColor": "text-emerald-600",
    "jellykit": true,
    "sourceCategory": "business"
  },
  {
    "slug": "packing-slip",
    "name": "Packing Slip",
    "description": "Shipment contents without prices",
    "category": "finance",
    "available": true,
    "iconColor": "text-emerald-600",
    "jellykit": true,
    "sourceCategory": "business"
  },
  {
    "slug": "profit-margin",
    "name": "Profit Margin Calculator",
    "description": "Margin, markup and profit from cost and price",
    "category": "finance",
    "available": true,
    "iconColor": "text-emerald-600",
    "jellykit": true,
    "sourceCategory": "business"
  },
  {
    "slug": "markup-calculator",
    "name": "Markup Calculator",
    "description": "Selling price from cost and markup",
    "category": "finance",
    "available": true,
    "iconColor": "text-emerald-600",
    "jellykit": true,
    "sourceCategory": "business"
  },
  {
    "slug": "revenue-calculator",
    "name": "Revenue Calculator",
    "description": "Revenue now and projected with monthly growth",
    "category": "finance",
    "available": true,
    "iconColor": "text-emerald-600",
    "jellykit": true,
    "sourceCategory": "business"
  },
  {
    "slug": "commission-calculator",
    "name": "Commission Calculator",
    "description": "Sales commission and total earnings",
    "category": "finance",
    "available": true,
    "iconColor": "text-emerald-600",
    "jellykit": true,
    "sourceCategory": "business"
  },
  {
    "slug": "roas-calculator",
    "name": "ROAS Calculator",
    "description": "Return on ad spend",
    "category": "finance",
    "available": true,
    "iconColor": "text-emerald-600",
    "jellykit": true,
    "sourceCategory": "business"
  },
  {
    "slug": "conversion-rate",
    "name": "Conversion Rate Calculator",
    "description": "Conversions as a share of visitors",
    "category": "finance",
    "available": true,
    "iconColor": "text-emerald-600",
    "jellykit": true,
    "sourceCategory": "business"
  },
  {
    "slug": "ctr-calculator",
    "name": "CTR Calculator",
    "description": "Click-through rate from impressions and clicks",
    "category": "finance",
    "available": true,
    "iconColor": "text-emerald-600",
    "jellykit": true,
    "sourceCategory": "business"
  },
  {
    "slug": "cpm-calculator",
    "name": "CPM Calculator",
    "description": "Cost per thousand impressions",
    "category": "finance",
    "available": true,
    "iconColor": "text-emerald-600",
    "jellykit": true,
    "sourceCategory": "business"
  },
  {
    "slug": "cpc-calculator",
    "name": "CPC Calculator",
    "description": "Cost per click",
    "category": "finance",
    "available": true,
    "iconColor": "text-emerald-600",
    "jellykit": true,
    "sourceCategory": "business"
  },
  {
    "slug": "invoice-hours",
    "name": "Timesheet to Invoice",
    "description": "Turn hours × rate into an invoice",
    "category": "finance",
    "available": true,
    "iconColor": "text-emerald-600",
    "jellykit": true,
    "sourceCategory": "business"
  },
  {
    "slug": "purchase-order",
    "name": "Purchase Order Generator",
    "description": "Purchase orders to send to suppliers",
    "category": "finance",
    "available": true,
    "iconColor": "text-emerald-600",
    "jellykit": true,
    "sourceCategory": "business"
  },
  {
    "slug": "proforma-invoice",
    "name": "Proforma Invoice",
    "description": "A preliminary invoice for quotes and customs",
    "category": "finance",
    "available": true,
    "iconColor": "text-emerald-600",
    "jellykit": true,
    "sourceCategory": "business"
  },
  {
    "slug": "credit-note",
    "name": "Credit Note",
    "description": "Credit notes for refunds and invoice corrections",
    "category": "finance",
    "available": true,
    "iconColor": "text-emerald-600",
    "jellykit": true,
    "sourceCategory": "business"
  },
  {
    "slug": "social-image-maker",
    "name": "Social Image Maker",
    "description": "Social Image Maker — free, private browser tool. Zero uploads.",
    "category": "image",
    "available": true,
    "iconColor": "text-amber-600",
    "jellykit": true,
    "sourceCategory": "social"
  },
  {
    "slug": "social-character-counter",
    "name": "Social Character Counter",
    "description": "Social Character Counter — free, private browser tool. Zero uploads.",
    "category": "image",
    "available": true,
    "iconColor": "text-amber-600",
    "jellykit": true,
    "sourceCategory": "social"
  },
  {
    "slug": "caption-formatter",
    "name": "Caption Formatter",
    "description": "Caption Formatter — free, private browser tool. Zero uploads.",
    "category": "image",
    "available": true,
    "iconColor": "text-amber-600",
    "jellykit": true,
    "sourceCategory": "social"
  },
  {
    "slug": "social-image-resizer",
    "name": "Social Image Resizer",
    "description": "Fit a photo to any platform size with safe areas",
    "category": "image",
    "available": true,
    "iconColor": "text-amber-600",
    "jellykit": true,
    "sourceCategory": "social"
  },
  {
    "slug": "instagram-post-image",
    "name": "Instagram Post (1080×1080)",
    "description": "Square posts",
    "category": "image",
    "available": true,
    "iconColor": "text-amber-600",
    "jellykit": true,
    "sourceCategory": "social"
  },
  {
    "slug": "instagram-story-image",
    "name": "Instagram Story (1080×1920)",
    "description": "Stories and Reels covers with safe areas",
    "category": "image",
    "available": true,
    "iconColor": "text-amber-600",
    "jellykit": true,
    "sourceCategory": "social"
  },
  {
    "slug": "x-post-image",
    "name": "X / Twitter Post Image (1600×900)",
    "description": "In-feed images that don’t get cropped",
    "category": "image",
    "available": true,
    "iconColor": "text-amber-600",
    "jellykit": true,
    "sourceCategory": "social"
  },
  {
    "slug": "x-header-image",
    "name": "X / Twitter Header (1500×500)",
    "description": "Profile header with avatar overlap guide",
    "category": "image",
    "available": true,
    "iconColor": "text-amber-600",
    "jellykit": true,
    "sourceCategory": "social"
  },
  {
    "slug": "linkedin-post-image",
    "name": "LinkedIn Post (1200×627)",
    "description": "Feed images and article covers",
    "category": "image",
    "available": true,
    "iconColor": "text-amber-600",
    "jellykit": true,
    "sourceCategory": "social"
  },
  {
    "slug": "linkedin-banner-image",
    "name": "LinkedIn Banner (1584×396)",
    "description": "Profile background banner",
    "category": "image",
    "available": true,
    "iconColor": "text-amber-600",
    "jellykit": true,
    "sourceCategory": "social"
  },
  {
    "slug": "youtube-thumbnail-image",
    "name": "YouTube Thumbnail (1280×720)",
    "description": "Bold thumbnails with big readable text",
    "category": "image",
    "available": true,
    "iconColor": "text-amber-600",
    "jellykit": true,
    "sourceCategory": "social"
  },
  {
    "slug": "youtube-banner-image",
    "name": "YouTube Banner (2560×1440)",
    "description": "Channel art with the TV/desktop/mobile safe area",
    "category": "image",
    "available": true,
    "iconColor": "text-amber-600",
    "jellykit": true,
    "sourceCategory": "social"
  },
  {
    "slug": "profile-picture-maker",
    "name": "Profile Picture Maker",
    "description": "Square or round avatars from any photo",
    "category": "image",
    "available": true,
    "iconColor": "text-amber-600",
    "jellykit": true,
    "sourceCategory": "social"
  },
  {
    "slug": "line-break-formatter",
    "name": "Line Break Formatter",
    "description": "Keep blank lines in Instagram and LinkedIn posts",
    "category": "image",
    "available": true,
    "iconColor": "text-amber-600",
    "jellykit": true,
    "sourceCategory": "social"
  },
  {
    "slug": "hashtag-formatter",
    "name": "Hashtag Formatter",
    "description": "Turn words into clean, unique #CamelCase hashtags",
    "category": "image",
    "available": true,
    "iconColor": "text-amber-600",
    "jellykit": true,
    "sourceCategory": "social"
  },
  {
    "slug": "thread-splitter",
    "name": "Thread Splitter",
    "description": "Split long text into numbered posts for X, Threads, Bluesky or Mastodon",
    "category": "image",
    "available": true,
    "iconColor": "text-amber-600",
    "jellykit": true,
    "sourceCategory": "social"
  },
  {
    "slug": "passphrase-generator",
    "name": "Passphrase Generator",
    "description": "Memorable multi-word passphrases",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "security"
  },
  {
    "slug": "exif-viewer",
    "name": "EXIF Viewer",
    "description": "See exactly what your photos reveal",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "security"
  },
  {
    "slug": "exif-remover",
    "name": "EXIF Remover",
    "description": "Remove location and camera data from photos",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "security"
  },
  {
    "slug": "jwt-inspect",
    "name": "Token Inspector",
    "description": "Check a JWT’s claims and expiry before using it",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "security"
  },
  {
    "slug": "random-hex",
    "name": "Random Hex Generator",
    "description": "Secure random hexadecimal strings",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "security"
  },
  {
    "slug": "random-base64",
    "name": "Random Base64 / Key Generator",
    "description": "Secure random bytes as hex, Base64 and Base64URL",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "security"
  },
  {
    "slug": "pin-generator",
    "name": "PIN Generator",
    "description": "Random numeric PINs",
    "category": "dev",
    "available": true,
    "iconColor": "text-violet-600",
    "jellykit": true,
    "sourceCategory": "security"
  },
  {
    "slug": "audio-inspector",
    "name": "Audio Inspector",
    "description": "Audio Inspector — free, private browser tool. Zero uploads.",
    "category": "image",
    "available": true,
    "iconColor": "text-amber-600",
    "jellykit": true,
    "sourceCategory": "media"
  },
  {
    "slug": "audio-trimmer",
    "name": "Audio Trimmer",
    "description": "Audio Trimmer — free, private browser tool. Zero uploads.",
    "category": "image",
    "available": true,
    "iconColor": "text-amber-600",
    "jellykit": true,
    "sourceCategory": "media"
  },
  {
    "slug": "video-frames",
    "name": "Video Frame Extractor",
    "description": "Video Frame Extractor — free, private browser tool. Zero uploads.",
    "category": "image",
    "available": true,
    "iconColor": "text-amber-600",
    "jellykit": true,
    "sourceCategory": "media"
  },
  {
    "slug": "video-trim",
    "name": "Trim Video",
    "description": "Cut a clip out of a video and save it (re-encoded in real time)",
    "category": "image",
    "available": true,
    "iconColor": "text-amber-600",
    "jellykit": true,
    "sourceCategory": "media"
  },
  {
    "slug": "audio-waveform",
    "name": "Waveform Viewer",
    "description": "Render a waveform image for any audio file",
    "category": "image",
    "available": true,
    "iconColor": "text-amber-600",
    "jellykit": true,
    "sourceCategory": "media"
  },
  {
    "slug": "video-inspector",
    "name": "Video Metadata",
    "description": "Duration, resolution and frame preview",
    "category": "image",
    "available": true,
    "iconColor": "text-amber-600",
    "jellykit": true,
    "sourceCategory": "media"
  },
  {
    "slug": "video-thumbnails",
    "name": "Video Thumbnails",
    "description": "A grid of evenly spaced thumbnails from a video",
    "category": "image",
    "available": true,
    "iconColor": "text-amber-600",
    "jellykit": true,
    "sourceCategory": "media"
  },
  {
    "slug": "video-to-gif",
    "name": "Video to GIF",
    "description": "Turn a short clip into an animated GIF",
    "category": "image",
    "available": true,
    "iconColor": "text-amber-600",
    "jellykit": true,
    "sourceCategory": "media"
  },
  {
    "slug": "audio-spectrogram",
    "name": "Audio Spectrogram",
    "description": "See frequencies over time; find the dominant pitch",
    "category": "image",
    "available": true,
    "iconColor": "text-amber-600",
    "jellykit": true,
    "sourceCategory": "media"
  },
  {
    "slug": "extract-audio",
    "name": "Extract Audio from Video",
    "description": "Save a video’s soundtrack as WAV (trim and fade optional)",
    "category": "image",
    "available": true,
    "iconColor": "text-amber-600",
    "jellykit": true,
    "sourceCategory": "media"
  },
  {
    "slug": "audio-volume",
    "name": "Change Audio Volume",
    "description": "Make audio louder or quieter, with fades",
    "category": "image",
    "available": true,
    "iconColor": "text-amber-600",
    "jellykit": true,
    "sourceCategory": "media"
  },
  {
    "slug": "audio-fade",
    "name": "Audio Fade In / Out",
    "description": "Add smooth fades to a clip",
    "category": "image",
    "available": true,
    "iconColor": "text-amber-600",
    "jellykit": true,
    "sourceCategory": "media"
  },
  {
    "slug": "video-crop",
    "name": "Crop Video",
    "description": "Crop to 1:1, 9:16, 4:5 or 16:9",
    "category": "image",
    "available": true,
    "iconColor": "text-amber-600",
    "jellykit": true,
    "sourceCategory": "media"
  },
  {
    "slug": "video-compress",
    "name": "Compress Video",
    "description": "Smaller video by lowering resolution and bitrate",
    "category": "image",
    "available": true,
    "iconColor": "text-amber-600",
    "jellykit": true,
    "sourceCategory": "media"
  },
  {
    "slug": "video-resize",
    "name": "Resize Video",
    "description": "Scale a video down to any size",
    "category": "image",
    "available": true,
    "iconColor": "text-amber-600",
    "jellykit": true,
    "sourceCategory": "media"
  },
  {
    "slug": "mute-video",
    "name": "Remove Audio from Video",
    "description": "A silent copy of your video",
    "category": "image",
    "available": true,
    "iconColor": "text-amber-600",
    "jellykit": true,
    "sourceCategory": "media"
  },
  {
    "slug": "gif-maker-media",
    "name": "Images to GIF",
    "description": "Turn a set of images into an animated GIF",
    "category": "image",
    "available": true,
    "iconColor": "text-amber-600",
    "jellykit": true,
    "sourceCategory": "media"
  },
  {
    "slug": "screen-recorder",
    "name": "Screen Recorder",
    "description": "Record your screen, a window or a tab — with mic and system audio",
    "category": "image",
    "available": true,
    "iconColor": "text-amber-600",
    "jellykit": true,
    "sourceCategory": "media"
  },
  {
    "slug": "webcam-recorder",
    "name": "Webcam Recorder",
    "description": "Record video from your camera and microphone",
    "category": "image",
    "available": true,
    "iconColor": "text-amber-600",
    "jellykit": true,
    "sourceCategory": "media"
  },
  {
    "slug": "voice-recorder",
    "name": "Voice Recorder",
    "description": "Record audio from your microphone, save as WebM/M4A or WAV",
    "category": "image",
    "available": true,
    "iconColor": "text-amber-600",
    "jellykit": true,
    "sourceCategory": "media"
  },
  {
    "slug": "audio-speed",
    "name": "Change Audio Speed",
    "description": "Speed up or slow down audio (pitch follows, like a tape)",
    "category": "image",
    "available": true,
    "iconColor": "text-amber-600",
    "jellykit": true,
    "sourceCategory": "media"
  },
  {
    "slug": "audio-tempo",
    "name": "Change Tempo (Keep Pitch)",
    "description": "Faster or slower audio without the chipmunk effect",
    "category": "image",
    "available": true,
    "iconColor": "text-amber-600",
    "jellykit": true,
    "sourceCategory": "media"
  },
  {
    "slug": "audio-pitch",
    "name": "Pitch Shifter",
    "description": "Shift pitch up or down in semitones, keeping the length",
    "category": "image",
    "available": true,
    "iconColor": "text-amber-600",
    "jellykit": true,
    "sourceCategory": "media"
  },
  {
    "slug": "reverse-audio",
    "name": "Reverse Audio",
    "description": "Play a recording backwards",
    "category": "image",
    "available": true,
    "iconColor": "text-amber-600",
    "jellykit": true,
    "sourceCategory": "media"
  },
  {
    "slug": "normalize-audio",
    "name": "Normalize Audio",
    "description": "Raise the level so the loudest peak hits a target",
    "category": "image",
    "available": true,
    "iconColor": "text-amber-600",
    "jellykit": true,
    "sourceCategory": "media"
  },
  {
    "slug": "remove-silence",
    "name": "Remove Silence",
    "description": "Cut long pauses and trim silent starts and ends",
    "category": "image",
    "available": true,
    "iconColor": "text-amber-600",
    "jellykit": true,
    "sourceCategory": "media"
  },
  {
    "slug": "stereo-to-mono",
    "name": "Stereo ↔ Mono",
    "description": "Mix to mono, duplicate to stereo, swap or extract channels",
    "category": "image",
    "available": true,
    "iconColor": "text-amber-600",
    "jellykit": true,
    "sourceCategory": "media"
  },
  {
    "slug": "audio-converter",
    "name": "Audio to WAV Converter",
    "description": "Convert MP3, M4A, Ogg, FLAC or video audio to WAV (16/24/32-bit, any sample rate)",
    "category": "image",
    "available": true,
    "iconColor": "text-amber-600",
    "jellykit": true,
    "sourceCategory": "media"
  },
  {
    "slug": "audio-joiner",
    "name": "Audio Joiner",
    "description": "Merge several audio files into one, with gaps or crossfades",
    "category": "image",
    "available": true,
    "iconColor": "text-amber-600",
    "jellykit": true,
    "sourceCategory": "media"
  },
  {
    "slug": "frequency-sweep",
    "name": "Frequency Sweep",
    "description": "A tone gliding from low to high — test speakers and hearing",
    "category": "image",
    "available": true,
    "iconColor": "text-amber-600",
    "jellykit": true,
    "sourceCategory": "media"
  },
  {
    "slug": "binaural-beats",
    "name": "Binaural Beats",
    "description": "Slightly different tones in each ear (headphones)",
    "category": "image",
    "available": true,
    "iconColor": "text-amber-600",
    "jellykit": true,
    "sourceCategory": "media"
  },
  {
    "slug": "dtmf-generator",
    "name": "DTMF Tone Generator",
    "description": "Telephone keypad tones for any number",
    "category": "image",
    "available": true,
    "iconColor": "text-amber-600",
    "jellykit": true,
    "sourceCategory": "media"
  },
  {
    "slug": "video-rotate",
    "name": "Rotate / Flip Video",
    "description": "Turn a sideways video upright or mirror it",
    "category": "image",
    "available": true,
    "iconColor": "text-amber-600",
    "jellykit": true,
    "sourceCategory": "media"
  },
  {
    "slug": "video-speed",
    "name": "Change Video Speed",
    "description": "Speed up or slow down a video (audio pitch is kept)",
    "category": "image",
    "available": true,
    "iconColor": "text-amber-600",
    "jellykit": true,
    "sourceCategory": "media"
  },
  {
    "slug": "video-converter",
    "name": "Video Converter (WebM / MP4)",
    "description": "Re-encode a video to WebM or MP4 — whatever this browser can encode",
    "category": "image",
    "available": true,
    "iconColor": "text-amber-600",
    "jellykit": true,
    "sourceCategory": "media"
  }
];

export const JELLYKIT_TOOLS_BY_SLUG = new Map<string, JellykitTool>(
  JELLYKIT_TOOLS.map((t) => [t.slug, t])
);

export function getJellykitTool(slug: string): JellykitTool | undefined {
  return JELLYKIT_TOOLS_BY_SLUG.get(slug);
}
