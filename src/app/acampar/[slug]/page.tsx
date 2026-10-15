import AcamparClient from "../AcamparClient";

export default async function AcamparSlugRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <AcamparClient eventSlug={slug} />;
}
