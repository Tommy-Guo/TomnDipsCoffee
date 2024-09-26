// /app/api/cafes/[id]/features/route.js
import { NextResponse } from 'next/server';
import { query } from '../../../../lib/db.js';

export async function GET(req, { params }) {
  const { id } = params;
  try {
    const features = await query('SELECT feature FROM cafe_features WHERE cafe_id = $1', [id]);

    return NextResponse.json(features);
  } catch (error) {
    console.error('Error fetching features:', error);
    return NextResponse.json({ error: 'Failed to fetch features' }, { status: 500 });
  }
}
