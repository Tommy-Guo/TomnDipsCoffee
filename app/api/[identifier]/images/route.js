// app/api/[identifier]/images/route.js
import fs from 'fs';
import path from 'path';

export async function GET(req, { params }) {
  const { identifier } = params; // Get the identifier from the URL parameters
  const imagesDir = path.join(process.cwd(), 'public/cafes', identifier);

  try {
    const files = await fs.promises.readdir(imagesDir);
    const imageFiles = files.filter(file => 
      /\.(webp|jpeg|jpg|png)$/.test(file) && !file.includes('icon')
    );
    return new Response(JSON.stringify(imageFiles), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Unable to scan directory' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
