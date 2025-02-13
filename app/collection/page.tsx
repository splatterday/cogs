"use client";  // ✅ Mark this as a Client Component

import Collection from "@/features/collection/Collection";
import { Suspense } from "react";
import { useUser } from "@/context/UserContext";

export default function MyCollection() {
    const username = useUser(); // ✅ Now it's safely inside a Client Component

    return (
        <div>
            <h2>Collection</h2>
            <Suspense fallback={<p>Loading collection...</p>}>
                <Collection username={username} />
            </Suspense>
        </div>
    );
}
