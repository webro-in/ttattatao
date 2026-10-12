import sharp from "sharp";
import { readdir, mkdir, stat } from "node:fs/promises";
import path from "node:path";

const inputDir = path.resolve("src/assets/images");
const outputDir = path.resolve("public/images/dishes");

await mkdir(outputDir, { recursive: true });

const files = (await readdir(inputDir)).filter((file) =>
  file.toLowerCase().endsWith(".png")
);

if (files.length === 0) {
  throw new Error("No PNG images found in src/assets/images");
}

let totalBefore = 0;
let totalAfter = 0;

for (const file of files) {
  const filename = path
    .parse(file)
    .name
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  const input = path.join(inputDir, file);
  const output = path.join(outputDir, `${filename}.webp`);

  await sharp(input)
    .rotate()
    .resize({
      width: 960,
      height: 960,
      fit: "inside",
      withoutEnlargement: true,
    })
    .webp({ quality: 80, effort: 5 })
    .toFile(output);

  const before = (await stat(input)).size;
  const after = (await stat(output)).size;

  totalBefore += before;
  totalAfter += after;

  console.log(
    `${file} -> ${filename}.webp | ${(after / 1024).toFixed(0)} KB`
  );
}

console.log("\nConversion Complete!");
console.log(`Total Images: ${files.length}`);
console.log(`Original: ${(totalBefore / 1048576).toFixed(2)} MB`);
console.log(`WebP: ${(totalAfter / 1048576).toFixed(2)} MB`);
console.log(`Saved: ${((1 - totalAfter / totalBefore) * 100).toFixed(1)}%`);
