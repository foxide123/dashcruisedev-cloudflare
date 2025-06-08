"use server";

const ApiURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getProjectInfo(){
    fetch(`${ApiURL}/admin/projects/`)
}