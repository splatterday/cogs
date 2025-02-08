import Search, { fetchAlbums } from "../server/Search"; // ✅ Correct named import


export default async function Home() {
    return (
        <div>
            <h2>Home</h2>
            <Search />
        </div>
    );
};