import React from "react";
import ModuleRenderer from "@/components/modules/ModuleRenderer";
import { getPageWithContent } from "@/services/modules/pageModule";

type Params = { params: { slug: string } };

export default async function Page({ params }: Params) {
  const slug = params.slug;
  const res = await fetch(
    `${process.env.API_URL}/api/admin/pages/slug/${slug}`,
    {
      cache: "no-cache",
    }
  );
  if (!res.ok) {
    return <div className="p-8">Page not found</div>;
  }
  const data = await res.json();
  const page = data.page;

  return (
    <main>
      {page.layout
        ?.sort((a: any, b: any) => (a.order || 0) - (b.order || 0))
        .map((item: any, idx: number) => (
          <ModuleRenderer
            item={item}
            index={idx}
            key={item.module?._id || idx}
          />
        ))}
    </main>
  );
}
