import { useDebounce } from "@/hooks/useDebounce";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import { absoluteUrlOfImage } from "@/lib/utils";
import axios from "axios";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function MovieSearchModal({ onHideModal, handleSelectMovie }) {
    const modalRef = useRef(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(1);
    const [searchResult, setSearchResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // Use the custom hook to detect clicks outside of the modal
    useOnClickOutside(modalRef, () => onHideModal());
    const debouncedSearchTerm = useDebounce(searchTerm, 400);

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            if (!debouncedSearchTerm) {
                setSearchResult(null);
                return;
            }

            setIsLoading(true);

            try {
                const response = await axios.get(`/api/search/?query=${debouncedSearchTerm}&page=${page}`);
                if (isMounted) {
                    setSearchResult(response?.data);
                }
            } catch (error) {
                if (isMounted) {
                    // Handle error if necessary, e.g. show an error message
                    console.error("Error fetching data:", error);
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false); // Set loading state to false after the request completes
                }
            }
        };

        fetchData();

        return () => {
            // Cleanup function to set the flag to false if the component unmounts
            isMounted = false;
        };
    }, [debouncedSearchTerm, page]);

    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
                <div ref={modalRef} className="bg-zinc-900 p-6 rounded-lg w-full max-w-2xl">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold">Search Movie</h2>
                        <button onClick={onHideModal} className="text-gray-400 hover:text-white">
                            ✕
                        </button>
                    </div>
                    <input
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        type="text"
                        placeholder="Type movie name..."
                        className="w-full bg-zinc-800 text-white px-4 py-2 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-red-600"
                    />
                    <div className="max-h-96 overflow-y-auto">
                        {/* card */}
                        {isLoading && <div>Loading....</div>}

                        {searchResult &&
                            searchResult?.results.map((movie) => (
                                <div
                                    onClick={() => handleSelectMovie(movie)}
                                    key={movie?.id}
                                    className="flex items-center gap-4 p-2 hover:bg-zinc-800 cursor-pointer rounded"
                                >
                                    <Image
                                        width={64}
                                        height={64}
                                        src={absoluteUrlOfImage(movie?.poster_path)}
                                        alt={movie?.original_title}
                                        className="w-16 h-24 object-cover rounded"
                                    />
                                    <div>
                                        <h3 className="font-bold">{movie?.original_title}</h3>
                                        <p className="text-sm text-gray-400">{movie?.release_date}</p>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </>
    );
}
