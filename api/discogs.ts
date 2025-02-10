export async function fetchDiscogsData(endpoint: string) {
    const API_URL = `https://api.discogs.com/${endpoint}`;
  
    const response = await fetch(API_URL, {
      headers: {
        "JLDC": "JLDC/1.0", // Required by Discogs
      },
    });
  
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    } else {
        // console.log('RESPONSE', response);
    }
  
    return response.json();
  }
  