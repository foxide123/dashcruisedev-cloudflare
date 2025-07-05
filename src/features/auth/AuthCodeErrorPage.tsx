'use client'

import { redirect } from "next/navigation";
import { useEffect, useState } from "react"

export function AuthCodeErrorPage(){
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const hash = window.location.hash.substring(1);
        const params = new URLSearchParams(hash);
        const errorDescription = params!.get('error_description')
        if(errorDescription) setError(errorDescription);

        setTimeout(() => {
            redirect("/");
        }, 5000)
    }, []);

    return(
        <div className="flex flex-col justify-center items-center text-2xl text-center font-medium gap-4">
            <p>Authentication Error: {error}</p>
           <p>Redirecting To the Login Page...</p>
        </div>
    )
}