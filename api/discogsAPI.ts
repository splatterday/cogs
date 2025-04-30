import axios from "axios";
import dotenv from "dotenv";

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

    // console.log(`📡 API Response:`, { totalPages, results });

    return { results, totalPages };
  } catch (error: any) {
    console.error(`🚨 Discogs Search API Error: ${error.message}`);
    return { results: [], totalPages: 1 };
  }
};

// export const fetchCollection = async () => {
//   try {
//     const response = await axios.get(`${BASE_URL}/users/${USERNAME}/collection/folders/0/releases`, {
//       headers: { Authorization: `Discogs token=${PERSONAL_TOKEN}` },
//     });

//     return response.data?.releases ?? [];
//   } catch (error) {
//     console.error("Discogs Collection API Error:", error);
//     return [];
//   }
// };

export const fetchCollection = async () => {
  const allWants: any[] = [];
  let page = 1;
  let totalPages = 1;

  do {
    const resp = await axios.get(
      `${BASE_URL}/users/${USERNAME}/wants`,
      {
        params: { page, per_page: 100 },      // max per_page is 100
        headers: { Authorization: `Discogs token=${PERSONAL_TOKEN}` }
      }
    );

    // pull out the array of raw want objects
    const batch = resp.data.wants as any[];
    // map to whatever shape you need (e.g. basic_information + ids)
    allWants.push(
      ...batch.map(w => ({
        ...w.basic_information,
        instance_id: w.id,
        date_added:  w.date_added
      }))
    );

    // update our loop
    totalPages = resp.data.pagination.pages;
    page++;
  } while (page <= totalPages);

  return allWants;
};

export const toggleCollection = async (releaseId: number, isInCollection: boolean) => {
  try {
      if (isInCollection) {
          // Remove from collection
          await axios.delete(`${BASE_URL}/users/${USERNAME}/collection/releases/${releaseId}`, {
              headers: { Authorization: `Discogs token=${PERSONAL_TOKEN}` },
          });

          console.log(`Removed release ${releaseId} from collection.`);
      } else {
          // Add to collection (default to "All" folder ID 0)
          await axios.post(`${BASE_URL}/users/${USERNAME}/collection/folders/0/releases/${releaseId}`, {}, {
              headers: { Authorization: `Discogs token=${PERSONAL_TOKEN}` },
          });

          console.log(`Added release ${releaseId} to collection.`);
      }
  } catch (error) {
      console.error("Discogs Toggle Collection API Error:", error);
  }
};

// export const fetchWantlist = async () => {
//   try {
//     const response = await axios.get(`${BASE_URL}/users/${USERNAME}/wants`, {
//       headers: { Authorization: `Discogs token=${PERSONAL_TOKEN}` },
//     });
//     console.log('FETCHED WANTS', response);

//     return response.data?.wants ?? [];
//   } catch (error) {
//     console.error("Discogs Wantlist API Error:", error);
//     return [];
//   }
// };

export const fetchWantlist = async () => {
  const allWants: any[] = [];
  let page = 1;
  let totalPages = 1;

  do {
    const resp = await axios.get(
      `${BASE_URL}/users/${USERNAME}/wants`,
      {
        params: { page, per_page: 100 },      // max per_page is 100
        headers: { Authorization: `Discogs token=${PERSONAL_TOKEN}` }
      }
    );

    // pull out the array of raw want objects
    const batch = resp.data.wants as any[];
    // map to whatever shape you need (e.g. basic_information + ids)
    allWants.push(
      ...batch.map(w => ({
        ...w.basic_information,
        instance_id: w.id,
        date_added:  w.date_added
      }))
    );

    // update our loop
    totalPages = resp.data.pagination.pages;
    page++;
  } while (page <= totalPages);

  return allWants;
};


export const toggleWantlist = async (releaseId: number, isInWantlist: boolea) => {
  try {
      // if (!releaseId.trim()) throw new Error("Invalid releaseId.");

      if (isInWantlist) {
          console.log('REMOVING', releaseId, typeof(releaseId));
          await axios.delete(`${BASE_URL}/users/${USERNAME}/wants/${releaseId}`, {
              headers: { Authorization: `Discogs token=${PERSONAL_TOKEN}` },
          });

          console.log(`Removed release ${releaseId} from Wantlist.`);
      } else {
        console.log('ADDING', releaseId);
          await axios.put(`${BASE_URL}/users/${USERNAME}/wants/${releaseId}`, {}, {
              headers: { Authorization: `Discogs token=${PERSONAL_TOKEN}` },
          });

          console.log(`Added release ${releaseId} to Wantlist.`);
      }
  } catch (error) {
      console.error("Discogs Toggle Wantlist API Error:", error);
  }
};

