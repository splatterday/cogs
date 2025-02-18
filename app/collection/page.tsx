import LoginPrompt from "@/features/auth/LoginPrompt";
import Collection from "@/features/collection/Collection";

export default function CollectionPage({ searchParams }: { searchParams: { username?: string } }) {
  const username = searchParams?.username;

  if (!username) {
    // Show a client component that handles login
    return <LoginPrompt />;
  }

  return <Collection username={username} />;
}
