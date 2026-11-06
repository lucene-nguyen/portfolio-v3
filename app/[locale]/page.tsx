import type { Metadata } from "next";
import { ContactSection } from "@/components/home/contact-section";
import { ExperienceSection } from "@/components/home/experience-section";
import { Hero } from "@/components/home/hero";
import { KitsSection } from "@/components/home/kits-section";
import { SkillsSection } from "@/components/home/skills-section";
import { WorkWithMeSection } from "@/components/home/work-with-me-section";
import { LabSection } from "@/components/home/lab-section";
import { RateLimitLab } from "@/components/lab/rate-limit-lab";
import { WorkSection } from "@/components/home/work-section";

import { features } from "@/lib/features";
import { homeAlternates, homePath, type Locale } from "@/lib/i18n";
import { setLocale } from "@/lib/i18n-server";
import { ogBase } from "@/lib/site";

// Canonical lives here, not in the root layout, so other pages (404, future routes) don't inherit it.
export async function generateMetadata({ params }: PageProps<"/[locale]">): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  return {
    alternates: { canonical: homePath(locale), languages: homeAlternates },
    openGraph: { type: "website", url: homePath(locale), ...ogBase },
  };
}

export default async function Home({ params }: PageProps<"/[locale]">) {
  setLocale((await params).locale as Locale);
  return (
    <>
      <main id="main" className="flex-1">
        <Hero />
        {/* Themes portal their signature block here, directly below the shared hero. */}
        <div id="theme-slot-home" />
        <SkillsSection />
        <ExperienceSection />
        {features.caseStudies && <WorkSection />}
        {features.lab && (
          <LabSection>
            <RateLimitLab />
            <div id="theme-slot-lab" />
          </LabSection>
        )}
        <KitsSection />
        <WorkWithMeSection />
      </main>
      <ContactSection />
    </>
  );
}
