"use client";

import type { AnchorHTMLAttributes } from "react";
import { CONTACT_SECTION_ID, getBookingHref, getWhatsAppHref } from "@/constants/contact-config";
import { ROUTES } from "@/constants/routes";
import { Link } from "@/i18n/navigation";
import { scrollToSection } from "@/utils/scroll-to-section";

type AnchorProps = AnchorHTMLAttributes<HTMLAnchorElement>;

function scrollToContact(e: React.MouseEvent<HTMLAnchorElement>) {
  e.preventDefault();
  scrollToSection(CONTACT_SECTION_ID);
}

/** Primary booking CTA — opens booking URL or scrolls to #contact. */
export function BookingCtaLink({ children, onClick, ...props }: AnchorProps) {
  const bookingHref = getBookingHref();

  if (bookingHref) {
    return (
      <a href={bookingHref} target="_blank" rel="noopener noreferrer" onClick={onClick} {...props}>
        {children}
      </a>
    );
  }

  return (
    <a href={`#${CONTACT_SECTION_ID}`} onClick={scrollToContact} {...props}>
      {children}
    </a>
  );
}

/** Concierge CTA — opens WhatsApp or scrolls to #contact. */
export function ConciergeCtaLink({ children, onClick, ...props }: AnchorProps) {
  const whatsappHref = getWhatsAppHref();

  if (whatsappHref) {
    return (
      <a href={whatsappHref} target="_blank" rel="noopener noreferrer" onClick={onClick} {...props}>
        {children}
      </a>
    );
  }

  return (
    <a href={`#${CONTACT_SECTION_ID}`} onClick={scrollToContact} {...props}>
      {children}
    </a>
  );
}

/** In-page navigation to the contact section (footer links, etc.). */
export function ContactSectionLink({ children, ...props }: AnchorProps) {
  return (
    <Link href={ROUTES.CONTACT} onClick={scrollToContact} {...props}>
      {children}
    </Link>
  );
}

/** Renders tel/mailto when configured; otherwise plain text. */
export function ContactDetailText({
  value,
  href,
  className,
}: {
  value: string;
  href: string | null;
  className?: string;
}) {
  if (href) {
    return (
      <a href={href} className={className} data-cursor="interactive">
        {value}
      </a>
    );
  }

  return <span className={className}>{value}</span>;
}
