import fs from 'fs';
import { join } from 'path';

export async function GET(request) {
  const { pathname } = new URL(request.url);
  const identifier = pathname.split('/')[2]; 

  const filePath = join(process.cwd(), 'public', 'cafes', identifier, `icon.webp`);
  
  try {
    const file = fs.readFileSync(filePath);
    return new Response(file, {
      headers: {
        'Content-Type': 'image/webp',
      },
    });
  } catch (error) {
    return new Response('File not found', { status: 404 });
  }
}
