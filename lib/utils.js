export function absoluteUrlOfImage(imagePath) {
    const url = "https://image.tmdb.org/t/p/original";

    const absolutePath = url + imagePath;

    return absolutePath;
}
