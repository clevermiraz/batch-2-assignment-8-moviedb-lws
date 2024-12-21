import { fetchDataFromApi } from "@/lib/axiosInstance";

export async function GET(request) {
    const { searchParams } = new URL(request.url);

    const url = `/search/movie?${searchParams}`;
    const data = await fetchDataFromApi(url);

    return Response.json(data);
}
