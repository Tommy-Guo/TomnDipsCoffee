// /app/api/cafes/route.js
import { NextResponse } from 'next/server';
import { query } from '../../lib/db.js';

export async function GET() {
  try {
    const cafes = await query('SELECT * FROM cafes ORDER BY cafe_name ASC');
    return NextResponse.json(cafes);
  } catch (error) {
    console.error('Error fetching cafes:', error);
    return NextResponse.json({ error: 'Failed to fetch cafes' }, { status: 500 });
  }
}
