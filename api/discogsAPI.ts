import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const BASE_URL = "https://api.discogs.com";
const PERSONAL_TOKEN = process.env.DISCOGS_PERSONAL_TOKEN;

if (!PERSONAL_TOKEN) {
  throw new Error("Missing Discogs API token. Ensure it is set in the .env file.");
}

export const searchDiscogs = async (
  query: string,
  type?: "artist" | "release" | "master",
  page = 1
) => {
  try {
    if (!query.trim()) throw new Error("Search query cannot be empty.");

    const params: Record<string, any> = { q: query, page };
    if (type) params.type = type;

    console.log(`🔵 Fetching from Discogs API:`, params);

    const response = await axios.get(`${BASE_URL}/database/search`, {
      params,
      headers: { Authorization: `Discogs token=${PERSONAL_TOKEN}` },
    });

    return response.data?.results ?? [];
  } catch (error: any) {
    console.error(`🚨 Discogs Search API Error: ${error.message}`);
    return [];
  }
};

export const fetchCollection = async (username: string) => {
    try {
        if (!username.trim()) throw new Error("Username cannot be empty.");

        const response = await axios.get(`${BASE_URL}/users/${username}/collection/folders/0/releases`, {
            headers: { Authorization: `Discogs token=${PERSONAL_TOKEN}` },
        });

        return response.data?.releases ?? [];
    } catch (error) {
        console.error("Discogs Collection API Error:", error);
        return [];
    }
};
