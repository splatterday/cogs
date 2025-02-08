import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { searchAlbums } from "./app/api/discogsApi.js"; // Ensure ".js" extension

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: "http://localhost:3000" })); // Allow frontend to access API
app.use(express.json());

app.get("/api/search", async (req, res) => {
    const query = req.query.q as string;
    if (!query) return res.status(400).json({ error: "Query parameter required" });

    const data = await searchAlbums(query);
    res.json(data);
});

app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
