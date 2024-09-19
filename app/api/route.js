import { readdirSync, statSync } from 'fs';
import { join } from 'path';

export async function GET() {
  try {
    const cafesDir = join(process.cwd(), 'public', 'cafes');
    const identifiers = readdirSync(cafesDir).filter(file => statSync(join(cafesDir, file)).isDirectory());

    return new Response(JSON.stringify({ identifiers }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response('Internal Server Error', { status: 500 });
  }
}
