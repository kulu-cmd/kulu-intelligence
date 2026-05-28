import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Reveal } from "@/components/Reveal";
import { CustomCursor } from "@/components/CustomCursor";
import { PageEnter } from "@/components/PageEnter";
import { AboutHero } from "@/components/AboutHero";
import { AboutDiscovery } from "@/components/AboutDiscovery";
import { ContactButtons } from "@/components/ContactButtons";

export default function AboutPage() {
  return (
    <>
      <CustomCursor />
      <PageEnter />
      <SiteHeader />

      <main>

        {/* Pop-art animated Bane speech hero */}
        <AboutHero />

        {/* Origin · Method · Wave sections */}
        <AboutDiscovery />

        {/* Contact */}
        <section
          id="contact"
          className="relative overflow-hidden bg-indigo text-dawn scroll-mt-24"
        >
          <div className="absolute inset-0 dot-field opacity-50 pointer-events-none" aria-hidden />
          <div
            className="relative mx-auto max-w-[1480px] px-6 md:px-12 py-12 md:py-16
                        grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center"
          >
            <Reveal className="md:col-span-6">
              <h2
                className="font-display font-semibold leading-[0.92] tracking-[-0.04em] max-w-[14ch]"
                style={{ fontSize: "clamp(44px, 6vw, 88px)" }}
              >
                Drop us a line<span className="text-stoep">.</span>
              </h2>
              <p className="mt-6 text-[15px] md:text-[16px] leading-[1.7] opacity-55 max-w-[40ch]">
                Tell us what's on your desk. We'll come back the same day.
              </p>
            </Reveal>

            <Reveal delay={0.15} className="md:col-span-6 flex flex-col gap-8">
              <ContactButtons />
            </Reveal>
          </div>
        </section>

      </main>

      <SiteFooter />
    </>
  );
}
