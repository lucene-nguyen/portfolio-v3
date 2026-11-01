import Image from "next/image";
import { Suspense } from "react";
import { Mail, MessageCircle } from "lucide-react";
import { contact, labels, profile } from "@/content/home";
import { shown } from "@/lib/placeholder";
import { ContactForm, ContactFormFromUrl } from "./contact-form";
import { buttonPrimary, buttonSecondary, container } from "./ui";

export function ContactSection() {
  return (
    <footer id="contact" aria-labelledby="contact-title" className="border-t border-border">
      <div className={`${container} flex flex-col gap-10 pt-24 pb-12`}>
        <div className="flex items-start justify-between gap-8">
          <div data-print="hide" className="flex max-w-[760px] flex-col gap-[18px]">
            <p data-part="eyebrow" className="font-mono text-sm text-accent">
              {contact.eyebrow}
            </p>
            <h2
              id="contact-title"
              className="font-heading text-[32px] leading-[1.1] font-bold tracking-[-0.02em] sm:text-[44px]"
            >
              {contact.title}
            </h2>
            <p className="text-lg leading-[1.6] text-text-secondary">{contact.subline}</p>
          </div>
          <Image
            data-part="avatar"
            data-print="hide"
            src={profile.avatar.src}
            alt={profile.avatar.alt}
            width={112}
            height={112}
            className="size-20 shrink-0 rounded-full border border-border-strong object-cover object-[center_20%] sm:size-28"
          />
        </div>
        <div className="flex flex-wrap items-start gap-12">
          <div data-print="hide" className="min-w-0 flex-[999_1_480px]">
            {/* The form reads ?type= on the client; without it, it renders with nothing preselected. */}
            <Suspense fallback={<ContactForm />}>
              <ContactFormFromUrl />
            </Suspense>
          </div>
          <div className="flex min-w-0 flex-[1_1_260px] flex-col gap-3">
            <div data-part="contact-actions" className="flex flex-wrap gap-3">
              <a
                href={`mailto:${profile.email}`}
                data-part="button"
                className={`${buttonPrimary} min-h-[52px] text-[17px]`}
              >
                <Mail size={20} aria-hidden />
                {profile.email}
              </a>
              <a
                href={profile.github}
                data-part="button"
                className={`${buttonSecondary} min-h-[52px]`}
              >
                {labels.github}
              </a>
              {shown(profile.linkedin) && (
                <a
                  href={profile.linkedin}
                  data-part="button"
                  className={`${buttonSecondary} min-h-[52px]`}
                >
                  {labels.linkedin}
                </a>
              )}
              <a
                href={contact.zalo.href}
                data-part="button"
                className={`${buttonSecondary} min-h-[52px]`}
              >
                <MessageCircle size={18} aria-hidden />
                {contact.zalo.label}
              </a>
            </div>
          </div>
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
