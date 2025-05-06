import axios from "axios";
import { Album } from "../types/discogs";

const BASE_URL = "https://api.discogs.com";
const USERNAME = process.env.NEXT_PUBLIC_DISCOGS_USER!;
const TOKEN    = process.env.NEXT_PUBLIC_DISCOGS_TOKEN!;

export interface SearchResponse {
  results: Album[];
  totalPages: number;
}

export async function searchDiscogs(
  query: string,
  type: string,
  page = 1
): Promise<SearchResponse> {
  const resp = await axios.get(`${BASE_URL}/database/search`, {
    params: { q: query, type, page, per_page: 50 },
    headers: { Authorization: `Discogs token=${TOKEN}` },
  });

  const results = (resp.data.results as any[]).map(r => ({
    ...r,
    user_data: { in_collection: false, in_wantlist: false },
  }));

  const totalPages = resp.data.pagination.pages as number;

  return { results, totalPages };
}

export async function fetchWantlist(): Promise<Album[]> {
  const all: Album[] = [];
  let page = 1, totalPages = 1;
  do {
    const { data } = await axios.get(`${BASE_URL}/users/${USERNAME}/wants`, {
      params: { page, per_page: 100 },
      headers: { Authorization: `Discogs token=${TOKEN}` },
    });
    const batch = (data.wants as any[]).map(w => ({
      ...w.basic_information,
      user_data: { in_collection: false, in_wantlist: true },
    }));
    all.push(...batch);
    totalPages = data.pagination.pages;
    page++;
  } while (page <= totalPages);
  return all;
}

export const addWant    = (releaseId: number)    =>
  axios.put(`${BASE_URL}/users/${USERNAME}/wants/${releaseId}`, {}, { headers: { Authorization: `Discogs token=${TOKEN}` } });
export const removeWant = (releaseId: number)    =>
  axios.delete(`${BASE_URL}/users/${USERNAME}/wants/${releaseId}`, { headers: { Authorization: `Discogs token=${TOKEN}` } });

export async function fetchCollection(): Promise<Album[]> {
  const all: Album[] = [];
  let page = 1, totalPages = 1;
  do {
    const { data } = await axios.get(
      `${BASE_URL}/users/${USERNAME}/collection/folders/0/releases`,
      {
        params: { page, per_page: 100 },
        headers: { Authorization: `Discogs token=${TOKEN}` },
      }
    );
    const batch = (data.releases as any[]).map(r => ({
      ...r.basic_information,
      user_data: { in_collection: true, in_wantlist: false },
    }));
    all.push(...batch);
    totalPages = data.pagination.pages;
    page++;
  } while (page <= totalPages);
  return all;
}

export const addCollection    = (releaseId: number) =>
  axios.post(`${BASE_URL}/users/${USERNAME}/collection/folders/0/releases/${releaseId}`, {}, { headers: { Authorization: `Discogs token=${TOKEN}` } });
export const removeCollection = (releaseId: number) =>
  axios.delete(`${BASE_URL}/users/${USERNAME}/collection/folders/0/releases/${releaseId}`, { headers: { Authorization: `Discogs token=${TOKEN}` } });
