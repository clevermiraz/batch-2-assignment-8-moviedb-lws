"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function SearchInput() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = () => {
        const params = new URLSearchParams(searchParams);

        if (searchTerm) {
            params.set("query", searchTerm);
            params.set("page", 1);
        } else {
            params.delete("query");
            params.delete("page");
        }

        if (pathname === "/search") {
            router.replace(`/search?${params.toString()}`);
        } else {
            router.push(`/search?${params.toString()}`);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    return (
        <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            type="text"
            id="searchInput"
            placeholder="Search movies..."
            className="bg-black bg-opacity-50 text-white px-4 py-2 rounded border border-gray-600 focus:outline-none focus:border-white"
        />
    );
}
