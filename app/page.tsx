import type { Metadata } from "next";
import { ContactSection } from "@/components/home/contact-section";
import { ExperienceSection } from "@/components/home/experience-section";
import { Hero } from "@/components/home/hero";
import { KitsSection } from "@/components/home/kits-section";
import { LabSection } from "@/components/home/lab-section";
import { RateLimitLab } from "@/components/lab/rate-limit-lab";
import { WorkSection } from "@/components/home/work-section";

import { ogBase } from "@/lib/site";

// Canonical lives here, not in the root layout, so other pages (404, future routes) don't inherit "/".
export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: { type: "website", url: "/", ...ogBase },
};

export default function Home() {
  return (
    <>
      <main id="main" className="flex-1">
        <Hero />
        {/* Themes portal their signature block here, directly below the shared hero. */}
        <div id="theme-slot-home" />
        <WorkSection />
        <LabSection>
          <RateLimitLab />
          <div id="theme-slot-lab" />
        </LabSection>
        <KitsSection />
        <ExperienceSection />
      </main>
      <ContactSection />
    </>
  );
}
