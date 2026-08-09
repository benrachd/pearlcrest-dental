"use client";

import type { ButtonHTMLAttributes } from "react";
import { useBookingModal } from "@/components/booking/booking-modal-provider";
import { CONTACT_SECTION_ID, getWhatsAppHref } from "@/constants/contact-config";
import { ROUTES } from "@/constants/routes";
import { Link } from "@/i18n/navigation";
import { scrollToSection } from "@/utils/scroll-to-section";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

function scrollToContact(e: React.MouseEvent<HTMLAnchorElement>) {
  e.preventDefault();
  scrollToSection(CONTACT_SECTION_ID);
}

/** Primary booking CTA — opens the shared booking modal. */
export function BookingCtaLink({ children, onClick, type = "button", ...props }: ButtonProps) {
  const { openBookingModal } = useBookingModal();

  return (
    <button
      type={type}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) openBookingModal();
      }}
      {...props}
    >
      {children}
    </button>
  );
}

/** Concierge CTA — opens WhatsApp or scrolls to #contact. */
export function ConciergeCtaLink({
  children,
  onClick,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
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
export function ContactSectionLink({ children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
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
