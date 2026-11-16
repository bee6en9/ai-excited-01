import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve, join } from 'node:path';

const outputDirectory = resolve(process.env.MAKEFUN_OUTPUT_DIR ?? '/output');
const imageBytes = await readFile('./entry.png');
await mkdir(outputDirectory, { recursive: true });
const destination = join(outputDirectory, 'entry.png');
await writeFile(destination, imageBytes);
const writtenBytes = await readFile(destination);
if (writtenBytes.byteLength !== imageBytes.byteLength) {
  throw new Error(
    `Output byte length mismatch: expected ${imageBytes.byteLength}, got ${writtenBytes.byteLength}`,
  );
}
console.log(`Wrote ${imageBytes.byteLength} bytes to ${destination}`);
