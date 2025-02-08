"use client"; // ✅ Must be a Client Component to fetch data

import { useState, useEffect } from "react";

const Collection = () => {
    const [collection, setCollection] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCollection = async () => {
            try {
                const response = await fetch("/api/collection");
                const data = await response.json();
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
                        collection.map((item, index) => (
                            <li key={index}>
                                <strong>{item.basic_information.title}</strong> ({item.basic_information.year})
                                {item.basic_information.cover_image && (
                                    <img src={item.basic_information.cover_image} width="100" />
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
