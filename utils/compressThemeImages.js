import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const themesDir = path.join(__dirname, '../public/assets/themes');

async function compressImages() {
  const files = fs.readdirSync(themesDir).filter(f => f.endsWith('.jpg'));
  
  console.log(`Found ${files.length} images to compress...`);
  
  for (const file of files) {
    const inputPath = path.join(themesDir, file);
    const outputPath = path.join(themesDir, file);
    
    try {
      const stats = fs.statSync(inputPath);
      const originalSize = (stats.size / 1024 / 1024).toFixed(2);
      
      await sharp(inputPath)
        .resize(800, 800, { fit: 'cover', withoutEnlargement: true })
        .jpeg({ quality: 75, progressive: true })
        .toFile(outputPath + '.tmp');
      
      fs.unlinkSync(inputPath);
      fs.renameSync(outputPath + '.tmp', outputPath);
      
      const newStats = fs.statSync(outputPath);
      const newSize = (newStats.size / 1024 / 1024).toFixed(2);
      const reduction = ((1 - newStats.size / stats.size) * 100).toFixed(1);
      
      console.log(`${file}: ${originalSize}MB → ${newSize}MB (${reduction}% reduction)`);
    } catch (error) {
      console.error(`Error compressing ${file}:`, error.message);
    }
  }
  
  console.log('Compression complete!');
}

compressImages().catch(console.error);
