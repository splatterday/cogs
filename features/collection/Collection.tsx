import Image from "next/image";
import { fetchCollection } from "@/api/discogsAPI";
import { DiscogsCollectionItem } from "@/types/discogs";
import { cache } from "react";

const getCachedCollection = cache(async (username: string) => {
    return await fetchCollection(username);
});

export default async function Collection({ username }: { username: string }) {
    const collection: DiscogsCollectionItem[] = await getCachedCollection(username);

    return (
        <div>
            <h1>{username}'s Collection</h1>
            {collection.length > 0 ? (
                <ul>
                    {collection.map((item) => (
                        item.basic_information ? (
                            <li key={item.id}>
                                <strong>{item.basic_information.title}</strong> ({item.basic_information.year})
                                {item.basic_information.cover_image && (
                                    <Image
                                        src={item.basic_information.cover_image}
                                        alt={item.basic_information.title?? "Album image"}
                                        width={100}
                                        height={100}
                                    />
                                )}
                            </li>
                        ) : null
                    ))}
                </ul>
            ) : (
                <p>No records found.</p>
            )}
        </div>
    );
}
