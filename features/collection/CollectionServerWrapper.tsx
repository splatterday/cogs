import Collection from "./Collection";

export default async function CollectionServerWrapper() {
  const username = process.env.USERNAME || "defaultUser";

  return <Collection username={username} />;
}
