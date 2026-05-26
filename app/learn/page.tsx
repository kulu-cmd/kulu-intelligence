import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { CustomCursor } from "@/components/CustomCursor";
import { PageEnter } from "@/components/PageEnter";
import LearnPageClient from "@/components/LearnPageClient";

export default function LearnPage() {
  return (
    <>
      <CustomCursor />
      <PageEnter />
      <SiteHeader />
      <main className="bg-dawn">
        <LearnPageClient />
      </main>
      <SiteFooter />
    </>
  );
}
