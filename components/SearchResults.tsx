"use client"; // ✅ Ensures dynamic updates without full reloads

import { useState, useEffect } from "react";
import { Album } from "../types/discogs";
import Image from "next/image";

const SearchResults = ({ query }: { query: string }) => {
    const [albums, setAlbums] = useState<Album[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!query) return;
        const fetchAlbums = async () => {
            setLoading(true);
            try {
                const response = await fetch(`http://localhost:5000/api/search?q=${query}`);
                const data = await response.json();
                setAlbums(data.results || []);
            } catch (error) {
                console.error("Error fetching albums:", error);
            }
            setLoading(false);
        };
        fetchAlbums();
    }, [query]); // ✅ Only triggers when `query` changes

    return (
        <div>
            {loading ? <p>Loading...</p> : (
                <ul>
                    {albums.length > 0 ? (
                        albums.map((album, index) => (
                            <li key={index}>
                                <strong>{album.title}</strong> ({album.year})
                                {album.cover_image &&
                                    // <img src={album.cover_image} width="100" />
                                    <Image 
                                        src={album.cover_image} 
                                        alt={album.title} 
                                        width={100} 
                                        height={100} 
                                    />
                                }
                            </li>
                        ))
                    ) : (
                        <p>No results found</p>
                    )}
                </ul>
            )}
        </div>
    );
};

export default SearchResults;
