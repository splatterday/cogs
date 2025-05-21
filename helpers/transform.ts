export function parseTitle(title: string): { artist: string; album: string } {
    const [artist, ...albumParts] = title.split(" - ");
    return {
      artist: artist.trim(),
      album: albumParts.join(" - ").trim(),
    };
  }
  