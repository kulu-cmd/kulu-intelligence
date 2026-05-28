import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { CustomCursor } from "@/components/CustomCursor";
import { PageEnter } from "@/components/PageEnter";
import { AutomationCatalogue } from "@/components/AutomationCatalogue";
import { CreativeCatalogue } from "@/components/CreativeCatalogue";

export default function ImplementPage() {
  return (
    <>
      <CustomCursor />
      <PageEnter />
      <SiteHeader />

      <main className="bg-dawn">
        <AutomationCatalogue />
        <CreativeCatalogue />
      </main>
      <SiteFooter />
    </>
  );
}
