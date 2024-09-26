import { query } from '../lib/db.js';

// export async function GET(req) {
//   try {
//     const result = await query('SELECT * FROM cafes', []);
    
//     return new Response(JSON.stringify(result.rows), {
//       status: 200,
//       headers: { 'Content-Type': 'application/json' },
//     });
//   } catch (error) {
//     return new Response(JSON.stringify({ message: 'Database query failed' }), {
//       status: 500,
//       headers: { 'Content-Type': 'application/json' },
//     });
//   }
// }

export async function GET(req) {
  try {
    const result = await pool.query(text, params);
    return new Response(JSON.stringify(result.rows), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Database query failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}