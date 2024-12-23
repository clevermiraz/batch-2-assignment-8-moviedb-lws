"use client";

import { AuthContext } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";

export default function AuthProvider({ children }) {
    const [auth, setAuth] = useState(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const userInfo = window.localStorage.getItem("userInfo");
            if (userInfo) {
                setAuth(JSON.parse(userInfo));
            }
        }
    }, []);

    return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>;
}
