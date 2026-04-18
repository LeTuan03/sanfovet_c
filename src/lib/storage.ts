import fs from 'fs/promises';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'src/data');

export type DataType = 
  | 'products' 
  | 'categories' 
  | 'articles' 
  | 'jobs' 
  | 'animal-tags' 
  | 'menus' 
  | 'settings' 
  | 'banners' 
  | 'media-gallery';

async function ensureDirectory() {
  try {
    await fs.access(DATA_DIR);
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true });
  }
}

export async function readData<T>(type: DataType): Promise<T> {
  await ensureDirectory();
  const filePath = path.join(DATA_DIR, `${type}.json`);
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(content) as T;
  } catch (error) {
    console.error(`Error reading data for ${type}:`, error);
    // Return empty state if file doesn't exist or is corrupted
    if (type === 'settings' || type === 'media-gallery') {
       return {} as T;
    }
    if (type === 'menus') {
       return [] as unknown as T;
    }
    return [] as unknown as T;
  }
}

export async function writeData<T>(type: DataType, data: T): Promise<void> {
  await ensureDirectory();
  const filePath = path.join(DATA_DIR, `${type}.json`);
  try {
    const content = JSON.stringify(data, null, 2);
    await fs.writeFile(filePath, content, 'utf-8');
  } catch (error) {
    console.error(`Error writing data for ${type}:`, error);
    throw new Error(`Failed to save data for ${type}`);
  }
}
