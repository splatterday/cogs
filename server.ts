import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { searchAlbums } from "@api/discogsAPI.ts";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: "http://localhost:3000" })); // Allow frontend to access API
app.use(express.json());

import { Request, Response } from "express";

app.get("/api/search", async (req: Request, res: Response) => {
  const data = await searchAlbums(req.query.q as string);
  res.json(data);
});

app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
