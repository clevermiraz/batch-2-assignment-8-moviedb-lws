"use client";

import { performAddOrRemoveToWatchList } from "@/actions";
import { useAuth } from "@/hooks/useAuth";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AddToWatchList({ movie }) {
    const { auth, setAuth } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    const [isWatchList, setIsWatchList] = useState(false);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        // Check if the movie is already in the user's watch list
        if (auth?.watchList?.some((item) => item.id === movie.id)) {
            setIsWatchList(true);
        }
    }, [auth, movie.id]);

    const handleWatchList = async () => {
        if (!auth) {
            router.push(`/login/?origin=${pathname}`);
            return;
        }

        const updatedUser = await performAddOrRemoveToWatchList(auth.id, movie);

        setAuth(updatedUser);
        // Update the local storage
        window.localStorage.setItem("userInfo", JSON.stringify(updatedUser));

        const newWatchListState = !isWatchList;
        setIsWatchList(newWatchListState);

        // Show temporary feedback message
        setMessage(newWatchListState ? "Added to Watch List" : "Removed from Watch List");

        // Reset feedback message after 2 seconds
        setTimeout(() => {
            setMessage(null);
        }, 2000);
    };

    return (
        <>
            <div className="mb-6">
                <div className="flex flex-wrap gap-4">
                    <div className="text-center">
                        <button
                            onClick={handleWatchList}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                                !isWatchList ? "bg-black/40" : "bg-red-600 text-white"
                            }`}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="icon icon-tabler icons-tabler-outline icon-tabler-file-plus"
                            >
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                                <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
                                <path d="M12 11l0 6" />
                                <path d="M9 14l6 0" />
                            </svg>
                            {isWatchList ? "Remove from Watch List" : "Add to Watch List"}
                        </button>
                    </div>

                    {message && (
                        <div className="text-center">
                            <button className="flex items-center gap-2 bg-black/40 px-4 py-2 rounded-lg text-green-600">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="icon icon-tabler icons-tabler-outline icon-tabler-checks"
                                >
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M7 12l5 5l10 -10" />
                                    <path d="M2 12l5 5m5 -5l5 -5" />
                                </svg>
                                {message}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
