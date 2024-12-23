"use client";

import { performLogin } from "@/actions";
import Spinner from "@/components/Spinner";
import { useAuth } from "@/hooks/useAuth";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function LoginForm() {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const { setAuth } = useAuth();
    const router = useRouter();

    const searchParams = useSearchParams();

    async function onSubmit(event) {
        event.preventDefault();

        try {
            setLoading(true);
            const formData = new FormData(event.currentTarget);
            const found = await performLogin(formData);

            if (found) {
                // Set user info in localStorage
                localStorage.setItem("userInfo", JSON.stringify(found));

                setAuth(found);
                const origin = searchParams.get("origin");

                if (origin) {
                    router.push(`${origin}`);
                    return;
                }

                router.push("/");
            } else {
                setError("Please provide a valid login credential");
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }
    return (
        <form onSubmit={onSubmit} id="loginForm" className="space-y-4">
            <div className="my-2 text-red-500">{error}</div>

            <input
                type="email"
                name="email"
                placeholder="Email or phone number"
                className="w-full p-3 bg-moviedb-gray text-white rounded focus:outline-none focus:ring-2 focus:ring-moviedb-red"
                required
            />
            <input
                type="password"
                name="password"
                placeholder="Password"
                className="w-full p-3 bg-moviedb-gray text-white rounded focus:outline-none focus:ring-2 focus:ring-moviedb-red"
                required
            />
            <button
                type="submit"
                className="w-full bg-moviedb-red text-white py-3 rounded hover:bg-red-700 transition duration-300"
            >
                {loading ? <Spinner /> : "Sign In"}
            </button>
        </form>
    );
}
