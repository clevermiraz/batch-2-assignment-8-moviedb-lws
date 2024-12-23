"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CheckLoggedInUser() {
    const { auth } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== "undefined") {
            if (!auth) {
                const currentPath = window.location.pathname + window.location.search;
                router.push(`/login/?origin=${encodeURIComponent(currentPath)}`);
            }
        }
    }, [auth, router]);

    return null;
}
