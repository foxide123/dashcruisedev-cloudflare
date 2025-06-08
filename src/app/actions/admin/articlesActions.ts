"use server";
const ApiURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getAllBlogs(){
    const response = await fetch(`${ApiURL}/blogs`);
    if(!response.ok){
        const errorText = await response.text();
        throw new Error(`Request failed with status ${response.status}: ${errorText}`)
    }

    return (await response.json())
}