import Collection from "@/features/collection/Collection";
import { Suspense } from "react";
import { useUser } from "@/context/UserContext";

export default function MyCollection() {
    const username = useUser();

    return (
        <div>
            <h2>Collection</h2>
            <Suspense fallback={<p>Loading collection...</p>}>
                <Collection username={username} />
            </Suspense>
        </div>
    );
}
