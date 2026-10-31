import { Mail } from "lucide-react";
import { contact, isPlaceholder, labels, profile } from "@/content/home";
import { buttonPrimary, buttonSecondary, container } from "./ui";

export function ContactSection() {
  return (
    <footer id="contact" aria-labelledby="contact-title" className="border-t border-border">
      <div className={`${container} flex flex-col gap-10 pt-24 pb-12`}>
        <div className="flex max-w-[760px] flex-col gap-[18px]">
          <p className="font-mono text-sm text-accent">{contact.eyebrow}</p>
          <h2
            id="contact-title"
            className="font-heading text-[36px] leading-[1.08] font-bold tracking-[-0.02em] sm:text-[52px]"
          >
            {contact.title}
          </h2>
        </div>
        <div className="flex flex-wrap gap-3">
          <a
            href={`mailto:${profile.email}`}
            className={`${buttonPrimary} min-h-[52px] text-[17px]`}
          >
            <Mail size={20} aria-hidden />
            {profile.email}
          </a>
          <a href={profile.github} className={`${buttonSecondary} min-h-[52px]`}>
            {labels.github}
          </a>
          {isPlaceholder(profile.linkedin) ? (
            // Not a control until the owner provides the URL.
            <span className="inline-flex min-h-[52px] items-center px-2 text-text-muted">
              {labels.linkedin} {profile.linkedin}
            </span>
          ) : (
            <a href={profile.linkedin} className={`${buttonSecondary} min-h-[52px]`}>
              {labels.linkedin}
            </a>
          )}
        </div>
        <div className="flex flex-wrap justify-between gap-3 border-t border-border pt-7 font-mono text-[13px] text-text-subtle">
          {contact.footer.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </div>
      </div>
    </footer>
  );
}
