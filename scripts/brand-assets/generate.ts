import { type AssetTarget, targets } from "./targets.ts";
import { type Browser, type Page, chromium } from "playwright";
import { REPO_ROOT } from "./render.ts";
import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const TARGET_ID_COLUMN_WIDTH = 28;
const CLI_ARGV_OFFSET = 2;
const EXIT_SUCCESS = 0;
const EXIT_FAILURE = 1;
const EMPTY_LENGTH = 0;

function printUsage() {
  console.log("Usage: pnpm brand-assets [target-id ...]\n");
  console.log(
    "Generates on-brand social/profile images from the Brand System (see .local/Levi Eber Brand System/).",
  );
  console.log("With no arguments, generates every target.\n");
  console.log("Available targets:");
  for (const target of targets) {
    console.log(`  ${target.id.padEnd(TARGET_ID_COLUMN_WIDTH)} ${target.description}`);
  }
}

function writeTempHtml(target: AssetTarget) {
  const tmpHtmlPath = path.join(REPO_ROOT, `.tmp-brand-asset-${target.id}.html`);
  fs.writeFileSync(tmpHtmlPath, target.html());

  return tmpHtmlPath;
}

async function captureTarget(browserPage: Page, target: AssetTarget, tmpHtmlPath: string) {
  await browserPage.goto(`file://${tmpHtmlPath}`, { waitUntil: "networkidle" });
  await browserPage.evaluate(() => document.fonts.ready);

  const outPath = path.join(REPO_ROOT, target.out);
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  await browserPage.screenshot({ omitBackground: target.omitBackground ?? false, path: outPath });

  console.log(`✓ ${target.id.padEnd(TARGET_ID_COLUMN_WIDTH)} -> ${target.out}`);
}

async function generateTarget(browser: Browser, target: AssetTarget) {
  const browserPage = await browser.newPage({ deviceScaleFactor: 1 });
  await browserPage.setViewportSize({ height: target.height, width: target.width });
  const tmpHtmlPath = writeTempHtml(target);

  try {
    await captureTarget(browserPage, target, tmpHtmlPath);
  } finally {
    fs.unlinkSync(tmpHtmlPath);
    await browserPage.close();
  }
}

const args = process.argv.slice(CLI_ARGV_OFFSET);

if (args.includes("--help") || args.includes("-h")) {
  printUsage();
  process.exit(EXIT_SUCCESS);
}

const requestedIds = args.filter((arg) => !arg.startsWith("-"));
const selected =
  requestedIds.length > EMPTY_LENGTH
    ? targets.filter((target) => requestedIds.includes(target.id))
    : targets;

const knownIds = new Set(targets.map((target) => target.id));
const unknownIds = requestedIds.filter((id) => !knownIds.has(id));
if (unknownIds.length > EMPTY_LENGTH) {
  console.error(`Unknown target(s): ${unknownIds.join(", ")}\n`);
  printUsage();
  process.exit(EXIT_FAILURE);
}

const browser = await chromium.launch();
try {
  await Promise.all(selected.map((target) => generateTarget(browser, target)));
} finally {
  await browser.close();
}
