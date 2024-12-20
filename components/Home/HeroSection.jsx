import { fetchDataFromApi } from "@/lib/axiosInstance";

export default async function HeroSection() {
    const data = await fetchDataFromApi("/movie/upcoming");

    const randomUpcomingMovie = data?.results?.[Math.floor(Math.random() * 20)];
    const url = "https://image.tmdb.org/t/p/original";
    const bgImage = url + randomUpcomingMovie?.backdrop_path;

    return (
        <>
            <div
                id="hero"
                className="relative h-screen"
                style={{
                    backgroundImage: `url(${bgImage})`,
                    backgroundSize: "cover",
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-t from-black"></div>
                <div className="absolute bottom-0 left-0 p-12">
                    <h1 id="heroTitle" className="text-5xl font-bold mb-4">
                        {randomUpcomingMovie?.original_title}
                    </h1>
                    <p id="heroOverview" className="text-lg max-w-2xl mb-4">
                        {randomUpcomingMovie?.overview}
                    </p>
                    <button className="bg-white text-black px-8 py-2 rounded-lg font-bold hover:bg-opacity-80">
                        ▶ Play
                    </button>
                </div>
            </div>
        </>
    );
}
