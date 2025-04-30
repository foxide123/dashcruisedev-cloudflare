import { NextResponse } from 'next/server';
import sanitizeHtml from 'sanitize-html';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
    const { title, content, image_url } = await req.json();
    const clean = sanitizeHtml(content);
    const { data, error } = await supabase
        .from('posts')
        .insert([{ title, content: clean, image_url }])
        .select();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data![0]);
}
