import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const secret = request.nextUrl.searchParams.get('secret');

    // Check for a secret token to prevent unauthorized access
    // In a real app, this should be an environment variable
    if (secret !== process.env.NOTION_SECRET) {
        return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }

    const path = request.nextUrl.searchParams.get('path') || '/';

    try {
        revalidatePath(path);
        return NextResponse.json({ revalidated: true, now: Date.now() });
    } catch (err) {
        return NextResponse.json({ message: 'Error revalidating' }, { status: 500 });
    }
}
