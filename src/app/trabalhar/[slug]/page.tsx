import TrabalharClient from "../TrabalharClient";

export default async function TrabalharSlugRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <TrabalharClient eventSlug={slug} />;
}
