import path from "node:path";

export const REPO_ROOT = path.resolve(import.meta.dirname, "..", "..");

const GENERAL_SANS_600 = path.join(REPO_ROOT, "public/fonts/general-sans/general-sans-600.woff2");
const GENERAL_SANS_700 = path.join(REPO_ROOT, "public/fonts/general-sans/general-sans-700.woff2");
const INTER_VARIABLE = path.join(
  REPO_ROOT,
  "node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2",
);
const MONO_VARIABLE = path.join(
  REPO_ROOT,
  "node_modules/@fontsource-variable/jetbrains-mono/files/jetbrains-mono-latin-wght-normal.woff2",
);

function fontFaces() {
  return `
    @font-face { font-family: 'General Sans'; src: url('file://${GENERAL_SANS_600}') format('woff2'); font-weight: 600; font-style: normal; }
    @font-face { font-family: 'General Sans'; src: url('file://${GENERAL_SANS_700}') format('woff2'); font-weight: 700; font-style: normal; }
    @font-face { font-family: 'Inter Variable'; src: url('file://${INTER_VARIABLE}') format('woff2-variations'); font-weight: 100 900; font-style: normal; }
    @font-face { font-family: 'JetBrains Mono Variable'; src: url('file://${MONO_VARIABLE}') format('woff2-variations'); font-weight: 100 800; font-style: normal; }
  `;
}

export function page(options: {
  background?: string;
  body: string;
  height: number;
  style?: string;
  width: number;
}) {
  const { background = "transparent", body, height, style = "", width } = options;

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  ${fontFaces()}
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { width: ${width}px; height: ${height}px; overflow: hidden; }
  body { background: ${background}; font-family: 'Inter Variable', sans-serif; }
  ${style}
</style>
</head>
<body>${body}</body>
</html>`;
}

/** The "LE" badge used as the social-card footer mark (repo/OG images). Scale-independent via viewBox. */
export function monogramBadge(size: number) {
  return `<svg width="${size}" height="${size}" viewBox="0 0 64 64">
    <rect x="1" y="1" width="62" height="62" rx="4" fill="#131316" stroke="#26272C"/>
    <text x="32" y="41" text-anchor="middle" font-family="'JetBrains Mono Variable', monospace" font-weight="700" font-size="22" fill="#F5F5F4">LE</text>
    <rect x="8" y="47" width="10" height="2" fill="#E8944A"/>
  </svg>`;
}
