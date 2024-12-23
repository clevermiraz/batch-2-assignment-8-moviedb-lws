"use client";

import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LogOutButton() {
    const { auth, setAuth } = useAuth();
    const router = useRouter();

    const logout = () => {
        setAuth(null);
        // clear local storage
        localStorage.removeItem("userInfo");
        router.push("/login");
    };

    return (
        <>
            {auth ? (
                <button onClick={logout} className="py-2 bg-slate-500 px-6 rounded-md text-white content-center">
                    Logout
                </button>
            ) : (
                <Link href="/login">
                    <button className="py-2 bg-red-500 px-6 rounded-md text-white content-center">LogIn</button>
                </Link>
            )}
        </>
    );
}
