import { absoluteUrlOfImage } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default function MovieCard({ movie }) {
    return (
        <div className="flex-shrink-0 w-48 cursor-pointer hover:scale-105 transition-transform">
            <Link href={`/movie/${movie?.id}`}>
                <Image
                    width={192}
                    height={288}
                    src={absoluteUrlOfImage(movie?.poster_path)}
                    alt="Smile 2"
                    className="w-full rounded-lg"
                />
                <div className="mt-2">
                    <h3 className="text-light text-sm font-bold truncate">{movie?.original_title}</h3>
                    <p className="text-primary text-xs">{movie?.release_date}</p>
                </div>
            </Link>
        </div>
    );
}
