import { REPO_ROOT, monogramBadge, page } from "./render.ts";
import { type Theme, colors } from "./tokens.ts";
import fs from "node:fs";
import path from "node:path";

export interface AssetTarget {
  id: string;
  description: string;
  width: number;
  height: number;
  out: string;
  /** Screenshot with a transparent background instead of the painted body background. */
  omitBackground?: boolean;
  html: () => string;
}

const OG_BADGE_SIZE = 56;
const GITHUB_BADGE_SIZE = 64;
const FAVICON_SIZE_SMALL = 16;
const FAVICON_SIZE_STANDARD = 32;
const APPLE_TOUCH_ICON_SIZE = 180;
const FAVICON_SIZE_LARGE = 512;
const FAVICON_SIZES = [
  FAVICON_SIZE_SMALL,
  FAVICON_SIZE_STANDARD,
  APPLE_TOUCH_ICON_SIZE,
  FAVICON_SIZE_LARGE,
];

// Open Graph / Twitter share image — used by src/main/routes/seo-head.ts.
const ogVariants = [
  { domain: "levieber.com", locale: "en", tagline: "Full Stack / Web Engineering / Design" },
  { domain: "levieber.com.br", locale: "pt-BR", tagline: "Full Stack / Engenharia Web / Design" },
];

function ogImageHtml({ tagline, domain }: { tagline: string; domain: string }) {
  const palette = colors.dark;

  return page({
    background: palette.bg,
    body: `
      <div class="frame">
        <div class="corner"></div>
        <div class="content">
          <div class="eyebrow">~/levi-eber $ whoami</div>
          <div class="wordmark">levi<span class="accent">/</span>eber<span class="accent">_</span></div>
          <div class="tagline">${tagline}</div>
        </div>
        <div class="bottom">
          <div class="domain">${domain}</div>
          ${monogramBadge(OG_BADGE_SIZE)}
        </div>
      </div>
    `,
    height: 630,
    style: `
      .frame { position: relative; width: 1200px; height: 630px; padding: 80px; display: flex; flex-direction: column; justify-content: center; }
      .content { margin-bottom: 64px; }
      .eyebrow { font-family: 'JetBrains Mono Variable', monospace; font-weight: 500; font-size: 17px; color: ${palette.muted}; letter-spacing: 0.01em; }
      .wordmark { font-family: 'General Sans', sans-serif; font-weight: 600; font-size: 92px; letter-spacing: -0.02em; color: ${palette.text}; margin-top: 30px; line-height: 1; }
      .wordmark .accent { color: ${palette.accent}; }
      .tagline { font-family: 'Inter Variable', sans-serif; font-weight: 400; font-size: 24px; color: ${palette.body}; margin-top: 26px; max-width: 760px; }
      .bottom { position: absolute; left: 80px; right: 80px; bottom: 76px; display: flex; justify-content: space-between; align-items: flex-end; }
      .domain { font-family: 'JetBrains Mono Variable', monospace; font-weight: 500; font-size: 16px; color: ${palette.dim}; }
      .corner { position: absolute; top: 56px; right: 56px; width: 18px; height: 18px; border-top: 1px solid ${palette.accent}; border-right: 1px solid ${palette.accent}; }
    `,
    width: 1200,
  });
}

// GitHub repo social preview (Settings → Social preview), 1280×640.
function githubSocialPreviewHtml() {
  const palette = colors.dark;

  return page({
    background: palette.bg,
    body: `
      <div class="frame">
        <div>
          <div class="eyebrow">~/levi-eber $ open</div>
          <div class="title">levieber.com</div>
          <div class="description">Personal portfolio site — TanStack Start, React 19 &amp; Tailwind CSS v4.</div>
        </div>
        <div class="bottom">
          <div class="domain">github.com/Levieber</div>
          ${monogramBadge(GITHUB_BADGE_SIZE)}
        </div>
      </div>
    `,
    height: 640,
    style: `
      .frame { width: 1280px; height: 640px; padding: 72px; display: flex; flex-direction: column; justify-content: space-between; }
      .eyebrow { font-family: 'JetBrains Mono Variable', monospace; font-size: 16px; color: ${palette.accent}; margin-bottom: 24px; }
      .title { font-family: 'JetBrains Mono Variable', monospace; font-weight: 600; font-size: 56px; color: ${palette.text}; }
      .description { font-family: 'Inter Variable', sans-serif; font-size: 22px; color: ${palette.muted}; margin-top: 20px; max-width: 900px; }
      .bottom { display: flex; justify-content: space-between; align-items: flex-end; }
      .domain { font-family: 'JetBrains Mono Variable', monospace; font-size: 15px; color: ${palette.dim}; }
    `,
    width: 1280,
  });
}

// GitHub profile README banner, 1280×400, dark + light (GitHub swaps these automatically via theme-aware markdown images).
function githubReadmeBannerHtml(theme: Theme) {
  const palette = colors[theme];

  return page({
    background: palette.bg,
    body: `
      <div class="frame">
        <div class="eyebrow">~/levi-eber $ welcome</div>
        <div class="wordmark">levi<span class="accent">/</span>eber<span class="accent">_</span></div>
        <div class="tagline">Software should feel good to use — and to build on.</div>
        <div class="corner-tr"></div>
        <div class="corner-br"></div>
      </div>
    `,
    height: 400,
    style: `
      .frame { position: relative; width: 1280px; height: 400px; padding: 56px 64px; overflow: hidden; }
      .eyebrow { font-family: 'JetBrains Mono Variable', monospace; font-size: 15px; color: ${palette.muted}; }
      .wordmark { font-family: 'General Sans', sans-serif; font-weight: 600; font-size: 64px; letter-spacing: -0.02em; color: ${palette.text}; margin-top: 28px; }
      .wordmark .accent { color: ${palette.accent}; }
      .tagline { font-family: 'Inter Variable', sans-serif; font-size: 20px; color: ${palette.body}; margin-top: 18px; }
      .corner-tr { position: absolute; top: 24px; right: 24px; width: 16px; height: 16px; border-top: 1px solid ${palette.accent}; border-right: 1px solid ${palette.accent}; }
      .corner-br { position: absolute; bottom: 24px; right: 24px; width: 16px; height: 16px; border-bottom: 1px solid ${palette.accent}; border-right: 1px solid ${palette.accent}; }
    `,
    width: 1280,
  });
}

// LinkedIn cover banner, 1584×396 (right-aligned to stay clear of the bottom-left avatar overlap).
function linkedinBannerHtml() {
  const palette = colors.dark;

  return page({
    background: palette.bg,
    body: `
      <div class="frame">
        <div class="content">
          <div class="eyebrow">~/levi-eber $ connect-with</div>
          <div class="wordmark">levi<span class="accent">/</span>eber</div>
          <div class="tagline">Software should feel good to use — and to build on.</div>
        </div>
      </div>
    `,
    height: 396,
    style: `
      .frame { position: relative; width: 1584px; height: 396px; }
      .content { position: absolute; right: 96px; top: 50%; transform: translateY(-50%); text-align: right; }
      .eyebrow { font-family: 'JetBrains Mono Variable', monospace; font-size: 14px; color: ${palette.muted}; margin-bottom: 16px; }
      .wordmark { font-family: 'General Sans', sans-serif; font-weight: 600; font-size: 46px; letter-spacing: -0.02em; color: ${palette.text}; }
      .wordmark .accent { color: ${palette.accent}; }
      .tagline { font-family: 'Inter Variable', sans-serif; font-size: 17px; color: ${palette.body}; margin-top: 12px; }
    `,
    width: 1584,
  });
}

// Favicon rasters, generated from the live public/favicon.svg so they never drift from the actual site icon.
function faviconHtml(size: number) {
  const source = fs.readFileSync(path.join(REPO_ROOT, "public/favicon.svg"), "utf-8");
  const sized = source.replace("<svg ", `<svg width="${size}" height="${size}" `);

  return page({ background: "transparent", body: sized, height: size, width: size });
}

export const targets: AssetTarget[] = [
  ...ogVariants.map(
    (variant): AssetTarget => ({
      description: `Open Graph / Twitter share image (1200×630) for locale "${variant.locale}"`,
      height: 630,
      html: () => ogImageHtml(variant),
      id: `og-${variant.locale}`,
      out: `public/og/${variant.locale}.png`,
      width: 1200,
    }),
  ),
  {
    description: "GitHub repo social preview (Settings → Social preview), 1280×640",
    height: 640,
    html: githubSocialPreviewHtml,
    id: "github-social-preview",
    out: ".local/brand-assets/github-social-preview.png",
    width: 1280,
  },
  {
    description: "Profile README banner, dark variant, 1280×400",
    height: 400,
    html: () => githubReadmeBannerHtml("dark"),
    id: "github-readme-banner-dark",
    out: ".local/brand-assets/github-readme-banner-dark.png",
    width: 1280,
  },
  {
    description: "Profile README banner, light variant, 1280×400",
    height: 400,
    html: () => githubReadmeBannerHtml("light"),
    id: "github-readme-banner-light",
    out: ".local/brand-assets/github-readme-banner-light.png",
    width: 1280,
  },
  {
    description: "LinkedIn cover banner, 1584×396",
    height: 396,
    html: linkedinBannerHtml,
    id: "linkedin-banner",
    out: ".local/brand-assets/linkedin-banner.png",
    width: 1584,
  },
  ...FAVICON_SIZES.map(
    (size): AssetTarget => ({
      description: `Favicon raster (${size}×${size}) generated from public/favicon.svg${size === APPLE_TOUCH_ICON_SIZE ? " — apple-touch-icon" : ""}`,
      height: size,
      html: () => faviconHtml(size),
      id: `favicon-${size}`,
      omitBackground: true,
      out:
        size === APPLE_TOUCH_ICON_SIZE
          ? "public/apple-touch-icon.png"
          : `public/favicon-${size}.png`,
      width: size,
    }),
  ),
];
