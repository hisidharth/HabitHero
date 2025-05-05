'use client';

import LoadingSpinner from "@/components/loading_spinner/loading_spinner";
import { useEffect } from "react";

export default function LoginPage() {
    useEffect(() => {
        window.location.href = '/auth/login?returnTo=/home';
    }, []);

    return (
        <div className="flex justify-center items-center h-svh w-svw">
            <LoadingSpinner text="Redirecting..." />
        </div>
    );
}