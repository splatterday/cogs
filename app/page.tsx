import { Suspense } from "react";
import Search from "../components/Search";


export default async function Home() {
    return (
        <div>
            <h2>Home</h2>
            <Suspense fallback={<p>Loading search...</p>}>
                <Search />
            </Suspense>
        </div>
    );
};