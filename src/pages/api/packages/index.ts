import type { Package } from "~/lib/packages";

export async function get({ params }) {
    const modules = await import.meta.glob("~/packages/*.json");
    const packages: Package[] = [];

    for (const module of Object.values(modules)) {
        packages.push((await module()).default);
    }

    return new Response(JSON.stringify(packages), {
      status: 200
    });
}