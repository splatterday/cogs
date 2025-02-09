import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

const BASE_URL = 'https://api.discogs.com';
const PERSONAL_TOKEN = process.env.DISCOGS_PERSONAL_TOKEN || ''; // Get token from .env

export const searchAlbums = async (query: string) => {
    try {
        if (!PERSONAL_TOKEN) throw new Error("Missing Discogs API token");

        const response = await axios.get(`${BASE_URL}/database/search`, {
            params: { q: query },
            headers: { Authorization: `Discogs token=${PERSONAL_TOKEN}` },
        });

        return response.data;
    } catch (error: unknown) {
        if (error instanceof Error) {
          console.error(`Discogs API Error: ${error.message}`);
        } else if (typeof error === "object" && error !== null && "response" in error) {
          const axiosError = error as { response?: { data?: { message?: string } } };
          console.error(`Discogs API Error: ${axiosError.response?.data?.message || "Unknown error"}`);
        } else {
          console.error("An unknown error occurred", error);
        }
        return null;
    }      
};

export const fetchCollection = async () => {
    try {
        const response = await fetch(`https://api.discogs.com/users/YOUR_USERNAME/collection/folders/0/releases`, {
            headers: { Authorization: `Discogs token=${process.env.DISCOGS_PERSONAL_TOKEN}` }
        });
        return response.json();
    } catch (error) {
        console.error("Error fetching collection:", error);
        return null;
    }
};
 