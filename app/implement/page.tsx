import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
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

        {/* Pull quote */}
        <section className="py-24 md:py-40">
          <div className="mx-auto max-w-[1480px] px-6 md:px-12">
            <Reveal>
              <blockquote className="font-display font-medium text-[32px] md:text-[56px] lg:text-[72px] leading-[1.05] tracking-[-0.03em] max-w-[24ch]">
                "Your people still do the work. They just stop doing the part that
                wasn't really the work<span className="text-stoep">."</span>
              </blockquote>
              <div className="eyebrow opacity-55 mt-8">— How we frame it for partners</div>
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
