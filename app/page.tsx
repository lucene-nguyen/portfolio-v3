import { ContactSection } from "@/components/home/contact-section";
import { ExperienceSection } from "@/components/home/experience-section";
import { Hero } from "@/components/home/hero";
import { KitsSection } from "@/components/home/kits-section";
import { LabSection } from "@/components/home/lab-section";
import { RateLimitLab } from "@/components/lab/rate-limit-lab";
import { WorkSection } from "@/components/home/work-section";

export default function Home() {
  return (
    <>
      <main id="main" className="flex-1">
        <Hero />
        <WorkSection />
        <LabSection>
          <RateLimitLab />
        </LabSection>
        <KitsSection />
        <ExperienceSection />
      </main>
      <ContactSection />
    </>
  );
}
