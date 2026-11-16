import { mkdir, readFile, stat, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const outputDirectory = resolve(process.env.MAKEFUN_OUTPUT_DIR ?? '/output');
const source = await readFile(new URL('./entry.png', import.meta.url));

await mkdir(outputDirectory, { recursive: true });
const outputPath = resolve(outputDirectory, 'entry.png');
await writeFile(outputPath, source);

const writtenSize = (await stat(outputPath)).size;
if (writtenSize !== source.byteLength) {
  throw new Error(`Output size mismatch: expected ${source.byteLength} bytes, got ${writtenSize}`);
}

console.log(`Wrote ${writtenSize} bytes to ${outputPath}`);
