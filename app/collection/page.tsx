// app/collection/page.tsx
import LoginPrompt from "@/features/auth/LoginPrompt";
import Collection from "@/features/collection/Collection";

export default async function CollectionPage({
  searchParams,
}: {
  searchParams: Promise<{ username?: string }>;
}) {
  const params = await searchParams;
  const username = params.username;

  if (!username) {
    return <LoginPrompt />;
  }

  return <Collection username={username} />;
}
