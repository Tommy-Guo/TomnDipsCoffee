// // /app/api/cafes/[id]/route.js
// import { NextResponse } from 'next/server';
// import { query } from '../../../lib/db.js';

// export async function GET(req, { params }) {
//   const { id } = params;
//   try {
//     const cafe = await query('SELECT * FROM cafes WHERE cafe_id = $1', [id]);
    
//     if (cafe.length > 0) {
//       return NextResponse.json(cafe[0]);
//     } else {
//       return NextResponse.json({ error: 'Cafe not found' }, { status: 404 });
//     }
//   } catch (error) {
//     console.error('Error fetching cafe:', error);
//     return NextResponse.json({ error: 'Failed to fetch cafe' }, { status: 500 });
//   }
// }



// /app/api/cafes/[id]/route.js
import { NextResponse } from 'next/server';
import { query } from '../../../lib/db.js';

export async function GET(req, { params }) {
  const { id } = params;

  try {
    // Fetch cafe data
    const cafe = await query('SELECT * FROM cafes WHERE cafe_id = $1', [id]);

    if (cafe.length === 0) {
      return NextResponse.json({ error: 'Cafe not found' }, { status: 404 });
    }

    // Fetch related data (features, hours, images)
    const features = await query('SELECT feature FROM cafe_features WHERE cafe_id = $1', [id]);
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
    const images = await query('SELECT image_url FROM cafe_images WHERE cafe_id = $1', [id]);

    // Combine all data into a single response object
    const cafeData = {
      ...cafe[0],
      features: features.map(f => f.feature),
      hours,
      images: images.map(i => i.image_url)
    };

    return NextResponse.json(cafeData);
  } catch (error) {
    console.error('Error fetching cafe data:', error);
    return NextResponse.json({ error: 'Failed to fetch cafe data' }, { status: 500 });
  }
}
