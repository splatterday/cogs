import axios from "axios";
import { Album, DiscogsSearchResponse } from "../types/discogs";

const BASE_URL = "https://api.discogs.com";
const USERNAME = process.env.NEXT_PUBLIC_DISCOGS_USERNAME!;
const TOKEN    = process.env.DISCOGS_PERSONAL_TOKEN!;
const DEFAULT_HEADERS = { Authorization: `Discogs token=${TOKEN}` };

export interface SearchResponse {
  results: DiscogsSearchResponse[];
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

  const results = (resp.data.results as DiscogsSearchResponse[]).map(r => ({
    ...r,
    user_data: { in_collection: false, in_wantlist: false },
  }));

  const totalPages = resp.data.pagination.pages as number;

  return { results, totalPages };
}

export async function fetchWantlist(): Promise<Album[]> {
  const all: Album[] = [];
  let page = 1;
  let totalPages = 1;
  do {
    const resp = await axios.get(`${BASE_URL}/users/${USERNAME}/wants`, {
      params: { page, per_page: 100 },
      headers: { Authorization: `Discogs token=${TOKEN}` },
    });
    const batch: Album[] = (resp.data.wants as DiscogsSearchResponse[]).map(w => ({
      ...w,
      user_data: { in_collection: false, in_wantlist: true },
    }));
    all.push(...batch);
    totalPages = resp.data.pagination.pages;
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
  let page = 1,
    totalPages = 1;

  do {
    const { data } = await axios.get(
      `${BASE_URL}/users/${USERNAME}/collection/folders/0/releases`,
      { params: { page, per_page: 100 }, headers: DEFAULT_HEADERS }
    );

    const batch = (data.releases as Album[]).map((r) => ({
      ...r,
      instance_id: r.id,
      folder_id:   r.folder_id,
      user_data:   { in_collection: true, in_wantlist: false },
    }));

    all.push(...batch);
    totalPages = data.pagination.pages;
    page++;
  } while (page <= totalPages);

  return all;
}

export async function addCollection(
  folderId: number,
  releaseId: number
): Promise<number> {
  const resp = await axios.post(
    `${BASE_URL}/users/${USERNAME}/collection/folders/${folderId}/releases/${releaseId}`,
    {},
    { headers: DEFAULT_HEADERS }
  );
  return resp.data.id as number; // Discogs returns the new entry ID here
}

export async function removeCollection(
  folderId: number,
  instanceId: number
): Promise<void> {
  await axios.delete(
    `${BASE_URL}/users/${USERNAME}/collection/folders/${folderId}/releases/${instanceId}`,
    { headers: DEFAULT_HEADERS }
  );
}