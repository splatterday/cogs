import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { searchDiscogs } from "./api/discogsAPI";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

app.get("/api/search", async (req: Request, res: Response): Promise<void> => {
    try {
        console.log(`📡 Raw Request Query:`, req.query);

        const query = typeof req.query.q === "string" ? req.query.q.trim() : "";
        let rawType = req.query.type;
        const page = Number(req.query.page) || 1;
        const mastersOnly = req.query.masters === "true";

        console.log(`🔍 Extracted Raw Values:`, { query, rawType, mastersOnly, page });

        let searchType: "artist" | "release" | "master" | undefined = undefined;
        if (typeof rawType === "string" && ["artist", "release", "master"].includes(rawType)) {
            searchType = rawType as "artist" | "release" | "master";
        }

        if (searchType === "release" && mastersOnly) {
            searchType = "master";
        }

        console.log(`📡 Parsed Request:`, { query, searchType, mastersOnly, page });

        if (!query) {
            res.status(400).json({ error: "Query parameter required" });
            return;
        }

        const { results, totalPages } = await searchDiscogs(query, searchType, page);

        console.log(`📡 Sending Response:`, { totalPages, resultsLength: results.length });
        res.json({ results, totalPages });
    } catch (error: any) {
        console.error("🚨 Server Error:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
