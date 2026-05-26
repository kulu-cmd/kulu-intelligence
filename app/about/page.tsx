import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { CustomCursor } from "@/components/CustomCursor";
import { PageEnter } from "@/components/PageEnter";
import { AboutDiscovery } from "@/components/AboutDiscovery";
import { Magnetic } from "@/components/Magnetic";

export default function AboutPage() {
  return (
    <>
      <CustomCursor />
      <PageEnter />
      <SiteHeader />
      <PageHero
        num="01"
        category="Who we are"
        title="Built here. Informed by the world."
        lead="A small, open-minded team obsessed with AI and what it can do for South African businesses."
        surface="mielie"
      />

      <main className="bg-dawn">

        {/* Interactive discovery — replaces scroll sections */}
        <AboutDiscovery />

        {/* Contact */}
        <section
          id="contact"
          className="relative overflow-hidden bg-indigo text-dawn scroll-mt-24"
        >
          <div className="absolute inset-0 dot-field opacity-50 pointer-events-none" aria-hidden />
          <div className="relative mx-auto max-w-[1480px] px-6 md:px-12 py-24 md:py-32
                          grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-end">

            <Reveal className="md:col-span-6">
              <div className="eyebrow opacity-55 mb-4">04 — Let's talk</div>
              <h2 className="font-display font-semibold text-[48px] md:text-[72px] lg:text-[88px]
                             leading-[0.92] tracking-[-0.04em] max-w-[14ch]">
                Drop us a line<span className="text-stoep">.</span>
              </h2>
              <p className="mt-6 text-[15px] md:text-[16px] leading-[1.7] opacity-55 max-w-[40ch]">
                Tell us what's on your desk. We'll come back the same day.
              </p>
            </Reveal>

            <Reveal delay={0.15} className="md:col-span-6 flex flex-col gap-8">
              <div className="flex flex-col gap-6">
                <div>
                  <div className="eyebrow opacity-50 mb-2">Email</div>
                  <a
                    href="mailto:hello@kulu-intelligence.co.za"
                    data-cursor
                    className="font-display font-medium text-[22px] md:text-[30px] lg:text-[36px]
                               tracking-[-0.02em] hover:text-stoep transition-colors duration-300 inline-block"
                  >
                    hello@kulu-intelligence.co.za
                  </a>
                </div>
                <div>
                  <div className="eyebrow opacity-50 mb-2">WhatsApp / Phone</div>
                  <a
                    href="https://wa.me/27613889339"
                    data-cursor
                    className="font-display font-medium text-[22px] md:text-[28px]
                               tracking-[-0.015em] hover:text-stoep transition-colors duration-300 inline-block"
                  >
                    +27 61 388 9339
                  </a>
                </div>
              </div>
              <div className="flex gap-3 flex-wrap">
                <Magnetic strength={0.3}>
                  <Link
                    href="/learn"
                    data-cursor
                    className="inline-flex items-center gap-2 px-6 py-3.5 bg-stoep text-indigo
                               rounded-full text-[14px] font-medium hover:bg-[#ff5747] transition-colors duration-300"
                  >
                    Book a seminar →
                  </Link>
                </Magnetic>
                <Magnetic strength={0.3}>
                  <Link
                    href="/implement"
                    data-cursor
                    className="inline-flex items-center gap-2 px-6 py-3.5 border border-dawn/30
                               text-dawn rounded-full text-[14px] font-medium hover:bg-dawn/10 transition-colors duration-300"
                  >
                    Automate something
                  </Link>
                </Magnetic>
              </div>
            </Reveal>

          </div>
        </section>

      </main>
      <SiteFooter />
    </>
  );
}
