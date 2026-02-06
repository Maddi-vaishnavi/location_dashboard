import { copyFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, '..', 'dist');
const indexPath = join(distDir, 'index.html');
const destPath = join(distDir, '404.html');

if (!existsSync(indexPath)) {
  console.error('copy-404: dist/index.html not found. Run "npm run build" first.');
  process.exit(1);
}
copyFileSync(indexPath, destPath);
console.log('copy-404: 404.html created for GitHub Pages SPA routing.');
