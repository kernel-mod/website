import type { Package } from "~/lib/packages";

export async function get({ params }) {
  const modules = await import.meta.glob("~/packages/*.json");
  const packages: Package[] = [];

  for (const module of Object.values(modules)) {
    packages.push((await module()).default);
  }

  const match = packages.find(pkg => pkg.id === params.id);

  if (!match) return new Response(`Could not find "${params.id}"`, { status: 404 });

  return new Response(JSON.stringify(match), {
    status: 200
  });
}