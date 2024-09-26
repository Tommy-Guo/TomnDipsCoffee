// /app/api/cafes/[id]/images/route.js
import { NextResponse } from 'next/server';
import { query } from '../../../../lib/db.js';

export async function GET(req, { params }) {
  const { id } = params;
  try {
    const images = await query('SELECT image_url FROM cafe_images WHERE cafe_id = $1', [id]);

    return NextResponse.json(images);
  } catch (error) {
    console.error('Error fetching images:', error);
    return NextResponse.json({ error: 'Failed to fetch images' }, { status: 500 });
  }
}
