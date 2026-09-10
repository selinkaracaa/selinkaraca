/**
 * Generate responsive AVIF/WebP/JPEG variants for the photographs the site
 * actually renders, into public/img/.
 *
 *   npm run images
 *
 * Re-run after adding or replacing anything in src/assets that the page uses.
 */
import sharp from "sharp";
import { mkdir, readdir, stat, readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const SRC = "src/assets";
const OUT = "public/img";

/** name -> widths to emit. Shared with the <Photo> component. */
const TARGETS = JSON.parse(await readFile("src/data/images.json", "utf8"));

const QUALITY = { avif: 52, webp: 74, jpeg: 78 };

const kb = (b) => `${Math.round(b / 1024)}KB`;

async function main() {
  if (!existsSync(OUT)) await mkdir(OUT, { recursive: true });

  let before = 0;
  let after = 0;
  /** widths declared in images.json that the source is too small to produce */
  const unbuildable = [];

  for (const [name, widths] of Object.entries(TARGETS)) {
    // phones hand you .JPG and .HEIC-converted .JPEG as often as .jpg
    const src = [".jpg", ".JPG", ".jpeg", ".JPEG", ".png", ".PNG"]
      .map((ext) => path.join(SRC, name + ext))
      .find((p) => existsSync(p));
    if (!src) {
      console.warn(`  ! no source for "${name}" in ${SRC} — skipped`);
      continue;
    }
    before += (await stat(src)).size;
    const meta = await sharp(src).metadata();

    for (const w of widths) {
      // <Photo> advertises every declared width in its srcset, so a width we
      // skip here becomes a 404 the browser may well pick. Refuse to ship that.
      if (meta.width && w > meta.width) {
        unbuildable.push(`${name}: declared ${w}w but ${name}.jpg is only ${meta.width}w`);
        continue;
      }
      const base = sharp(src).resize({ width: w, withoutEnlargement: true });

      await base.clone().avif({ quality: QUALITY.avif }).toFile(path.join(OUT, `${name}-${w}.avif`));
      await base.clone().webp({ quality: QUALITY.webp }).toFile(path.join(OUT, `${name}-${w}.webp`));
    }

    // one JPEG fallback at the mid width, for browsers with neither format
    const fallbackW = widths[Math.max(0, widths.length - 2)];
    await sharp(src)
      .resize({ width: fallbackW, withoutEnlargement: true })
      .jpeg({ quality: QUALITY.jpeg, mozjpeg: true })
      .toFile(path.join(OUT, `${name}-${fallbackW}.jpg`));

    console.log(`  ✓ ${name} → ${widths.join(", ")}`);
  }

  for (const f of await readdir(OUT)) after += (await stat(path.join(OUT, f))).size;

  console.log(`\n  originals: ${kb(before)}`);
  console.log(`  generated: ${kb(after)} across all widths and formats`);

  if (unbuildable.length) {
    console.error("\n  ✗ these declared widths exceed their source image:\n");
    for (const m of unbuildable) console.error(`      ${m}`);
    console.error(
      "\n  Lower them in src/data/images.json (or supply a larger source),\n" +
        "  otherwise <Photo> will point the browser at files that don't exist.\n",
    );
    process.exit(1);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
