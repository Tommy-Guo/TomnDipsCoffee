// /app/api/cafes/[id]/hours/route.js
import { NextResponse } from 'next/server';
import { query } from '../../../../lib/db.js';

export async function GET(req, { params }) {
  const { id } = params;
  try {
    const hours = await query(`
      SELECT day_of_week, open_time, close_time
      FROM cafe_hours
      WHERE cafe_id = $1
      ORDER BY 
        CASE 
          WHEN day_of_week = 'Monday' THEN 1
          WHEN day_of_week = 'Tuesday' THEN 2
          WHEN day_of_week = 'Wednesday' THEN 3
          WHEN day_of_week = 'Thursday' THEN 4
          WHEN day_of_week = 'Friday' THEN 5
          WHEN day_of_week = 'Saturday' THEN 6
          WHEN day_of_week = 'Sunday' THEN 7
        END;
    `, [id]);

    return NextResponse.json(hours);
  } catch (error) {
    console.error('Error fetching hours:', error);
    return NextResponse.json({ error: 'Failed to fetch hours' }, { status: 500 });
  }
}
