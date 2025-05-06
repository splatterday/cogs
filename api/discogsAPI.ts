import axios from "axios";
import dotenv from "dotenv";
import { Album } from "@/types/discogs";

dotenv.config();

const BASE_URL = "https://api.discogs.com";
const PERSONAL_TOKEN = process.env.DISCOGS_PERSONAL_TOKEN;
const USERNAME = "splatterday";

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

    const response = await axios.get(`${BASE_URL}/database/search`, {
      params: { q: query, type, page },
      headers: { Authorization: `Discogs token=${PERSONAL_TOKEN}` },
    });

    const totalPages = response.data?.pagination?.pages ?? 1;
    const results = response.data?.results ?? [];

    console.log(`📡 API Response:`, { totalPages, results });

    return { results, totalPages };
  } catch (error: any) {
    console.error(`Discogs Search API Error: ${error.message}`);
    return { results: [], totalPages: 1 };
  }
};

export async function fetchWantlist(): Promise<Album[]> {
  const all: Album[] = [];
  let page = 1;
  let totalPages = 1;
  do {
    const resp = await axios.get(`${BASE_URL}/users/${USERNAME}/wants`, {
      params: { page, per_page: 100 },
      headers: { Authorization: `Discogs token=${PERSONAL_TOKEN}` },
    });
    const batch: Album[] = (resp.data.wants as any[]).map(w => ({
      ...w.basic_information,
      user_data: { in_collection: false, in_wantlist: true },
    }));
    all.push(...batch);
    totalPages = resp.data.pagination.pages;
    page++;
  } while (page <= totalPages);
  return all;
}

/**
 * Add a release to the user's wantlist
 */
export async function addWant(releaseId: number): Promise<void> {
  await axios.put(
    `${BASE_URL}/users/${USERNAME}/wants/${releaseId}`,
    {},
    { headers: { Authorization: `Discogs token=${PERSONAL_TOKEN}` } }
  );
}

/**
 * Remove a release from the user's wantlist
 */
export async function removeWant(releaseId: number): Promise<void> {
  await axios.delete(
    `${BASE_URL}/users/${USERNAME}/wants/${releaseId}`,
    { headers: { Authorization: `Discogs token=${PERSONAL_TOKEN}` } }
  );
}

/**
 * Fetch the full collection (all pages) and map into Album[]
 */
export async function fetchCollection(): Promise<Album[]> {
  const all: Album[] = [];
  let page = 1;
  let totalPages = 1;
  do {
    const resp = await axios.get(`${BASE_URL}/users/${USERNAME}/collection/folders/0/releases`, {
      params: { page, per_page: 100 },
      headers: { Authorization: `Discogs token=${PERSONAL_TOKEN}` },
    });
    const batch: Album[] = (resp.data.releases as any[]).map(r => ({
      ...r.basic_information,
      user_data: { in_collection: true, in_wantlist: false },
    }));
    all.push(...batch);
    totalPages = resp.data.pagination.pages;
    page++;
  } while (page <= totalPages);
  return all;
}

/**
 * Add a release to the user's collection
 */
export async function addCollection(releaseId: number): Promise<void> {
  await axios.post(
    `${BASE_URL}/users/${USERNAME}/collection/folders/0/releases/${releaseId}`,
    {},
    { headers: { Authorization: `Discogs token=${PERSONAL_TOKEN}` } }
  );
}

/**
 * Remove a release from the user's collection
 */
export async function removeCollection(releaseId: number): Promise<void> {
  await axios.delete(
    `${BASE_URL}/users/${USERNAME}/collection/folders/0/releases/${releaseId}`,
    { headers: { Authorization: `Discogs token=${PERSONAL_TOKEN}` } }
  );
}