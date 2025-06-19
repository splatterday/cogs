"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import SearchInput from "./SearchInput";
import { Button } from "@/components/ui/Button/Button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/Select";
import { Checkbox } from "@/components/ui/Checkbox";
import { Label } from "@/components/ui/Label";
import type { CheckedState } from "@radix-ui/react-checkbox";

export default function SearchField() {
  const router = useRouter();

  const [query, setQuery] = useState("");
  const [mastersOnly, setMastersOnly] = useState(false);
  const [searchType, setSearchType] = useState<"release" | "artist" | "all">("release");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    const params = new URLSearchParams();
    params.set("q", query);
    params.set("page", "1");

    if (searchType !== "all") {
      params.set("type", searchType);
    }
    if (searchType === "release" && mastersOnly) {
      params.set("type", "master");
    }

    router.push(`/search?${params.toString()}`, { scroll: false });
  };

  return (
    <form
      onSubmit={handleSearch}
      className="w-fit max-w-[500px] mx-auto flex flex-row flex-wrap items-center gap-2"
    >
      <div className="flex items-center gap-2">
        <Checkbox
          id="mastersOnly"
          checked={mastersOnly}
          disabled={searchType !== "release"}
          onCheckedChange={(checked: CheckedState) =>
            setMastersOnly(checked === true)
          }
        />
        <Label htmlFor="mastersOnly">Masters</Label>
      </div>

      <div className="relative">
        <Select value={searchType} onValueChange={(value) => setSearchType(value as "release" | "artist" | "all")}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="release">Releases</SelectItem>
            <SelectItem value="artist">Artists</SelectItem>
            <SelectItem value="all">All</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <SearchInput query={query} setQuery={setQuery} />

      <Button type="submit" variant="default">
        Search
      </Button>
    </form>
  );
}
