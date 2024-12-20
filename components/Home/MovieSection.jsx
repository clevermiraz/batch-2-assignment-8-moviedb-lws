import PopularMovies from "./PopularMovies";
import TopRatedMovies from "./TopRatedMovies";
import TrendingMovies from "./TrendingMovies";

export default function MovieSection() {
    return (
        <>
            <div className="container mx-auto px-4 py-8">
                {/* <!-- Trending Movies --> */}
                <TrendingMovies />

                {/* <!-- Popular Movies --> */}
                <PopularMovies />

                {/* <!-- Top Rated Movies --> */}
                <TopRatedMovies />
            </div>
        </>
    );
}
