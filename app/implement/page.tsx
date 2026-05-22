import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PageHero } from "@/components/PageHero";
import { CustomCursor } from "@/components/CustomCursor";
import { PageEnter } from "@/components/PageEnter";
import { AutomationCatalogue } from "@/components/AutomationCatalogue";

export default function ImplementPage() {
  return (
    <>
      <CustomCursor />
      <PageEnter />
      <SiteHeader />
      <PageHero
        num="Implement"
        category="Embedded AI work for professional firms"
        title="Automate your time-consuming workflows"
        lead="Imagine all those hours you spend doing the same tasks every week... they could be spent braai'ing."
        surface="indigo"
      />

      <main className="bg-dawn">
        <AutomationCatalogue />

      </main>
      <SiteFooter />
    </>
  );
}
