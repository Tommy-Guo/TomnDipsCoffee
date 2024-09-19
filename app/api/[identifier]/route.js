import { readFileSync } from 'fs';
import { join } from 'path';

const readJsonFile = (filePath) => {
  try {
    const data = readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading JSON file:', error);
    return null;
  }
};

export async function GET(request, { params }) {
  const { identifier } = params;

  const filePath = join(process.cwd(), 'public', 'cafes', identifier, `${identifier}.json`);
  const cafeData = readJsonFile(filePath);

  if (!cafeData) {
    return new Response('Not Found', { status: 404 });
  }

  return new Response(JSON.stringify(cafeData), {
    headers: { 'Content-Type': 'application/json' }
  });
}
