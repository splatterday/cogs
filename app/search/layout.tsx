import SearchField from "@/features/search/SearchField";

export default function SearchLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-4 space-y-6">
      <SearchField />
      {children}
    </div>
  );
}