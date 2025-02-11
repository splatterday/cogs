"use client"; // ✅ Must be a Client Component to fetch data

import { useState, useEffect } from "react";
import { DiscogsCollectionItem, DiscogsCollectionResponse } from "../../types/discogs";
import Image from "next/image";

const Collection = () => {
    const [collection, setCollection] = useState<DiscogsCollectionItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCollection = async () => {
            try {
                const response = await fetch("/api/collection");
                const data: DiscogsCollectionResponse = await response.json();
                setCollection(data.releases || []);
            } catch (error) {
                console.error("Error fetching collection:", error);
            }
            setLoading(false);
        };
        fetchCollection();
    }, []);

    return (
        <div>
            <h1>My Collection</h1>
            {loading ? <p>Loading...</p> : (
                <ul>
                    {collection.length > 0 ? (
                        collection.map((item) => (
                            <li key={item.id}>
                                <strong>{item.basic_information.title}</strong> ({item.basic_information.year})
                                {item.basic_information.cover_image && (
                                    // <img src={item.basic_information.cover_image} width="100" alt={item.basic_information.title} />
                                    <Image
                                        src={item.basic_information.cover_image}
                                        alt={item.basic_information.title}
                                        width={100}
                                        height={100}
                                    />
                                )}
                            </li>
                        ))
                    ) : (
                        <p>No records found.</p>
                    )}
                </ul>
            )}
        </div>
    );
};

export default Collection;
