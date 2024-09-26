import { NextResponse } from 'next/server';

export async function GET() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/';
  
  try {
    const response = await fetch(`${apiUrl}`);
    if (!response.ok) throw new Error(`Failed to fetch data: ${response.status}`);

    const data = await response.json();
    const identifiers = data.identifiers;
    const baseUrl = 'https://tndcoffee.com';

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${identifiers
          .map(identifier => `
            <url>
              <loc>${baseUrl}/${identifier}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>daily</changefreq>
              <priority>0.8</priority>
            </url>
          `).join('')}
          <url>
            <loc>${baseUrl}/aboutus</loc>
            <lastmod>${new Date().toISOString()}</lastmod>
            <changefreq>daily</changefreq>
            <priority>0.4</priority>
          </url>
        <url>
          <loc>${baseUrl}</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <changefreq>daily</changefreq>
          <priority>1.0</priority>
        </url>
      </urlset>`;

    return new NextResponse(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
      },
    });
  } catch (error) {
    return new NextResponse('Sitemap generation failed', { status: 500 });
  }
}

