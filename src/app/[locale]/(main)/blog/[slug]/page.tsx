import { createClient } from "@/utils/supabase/server";

export async function generateStaticParams(){
    const supabase = await createClient();
    const { data: slugs } = await supabase.from("posts").select("slug"); 
}

export default async function BlogPost(){
    return (<div></div>);
}