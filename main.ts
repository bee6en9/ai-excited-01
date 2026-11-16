import { mkdir, readFile, stat, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const sourcePath = join(scriptDirectory, 'entry.png');
const outputDirectory = resolve(process.env.MAKEFUN_OUTPUT_DIR ?? '/output');
const destinationPath = join(outputDirectory, 'entry.png');

const sourceBytes = await readFile(sourcePath);
await mkdir(outputDirectory, { recursive: true });
await writeFile(destinationPath, sourceBytes);
const writtenLength = (await stat(destinationPath)).size;
if (writtenLength !== sourceBytes.byteLength) {
  throw new Error(`Output length mismatch: expected ${sourceBytes.byteLength}, got ${writtenLength}`);
}
console.log(`Wrote ${writtenLength} bytes to ${destinationPath}`);
