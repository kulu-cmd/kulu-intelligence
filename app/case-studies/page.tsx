import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { CaseStudiesHero } from "@/components/CaseStudiesHero";
import { ClientCards } from "@/components/ClientCards";
import { CustomCursor } from "@/components/CustomCursor";
import { PageEnter } from "@/components/PageEnter";

export default function CaseStudiesPage() {
  return (
    <>
      <CustomCursor />
      <PageEnter />
      <SiteHeader />
      <CaseStudiesHero />
      <main>
        <ClientCards />
      </main>
      <SiteFooter />
    </>
  );
}
