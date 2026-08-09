"use client";

import type { ButtonHTMLAttributes } from "react";
import { useBookingModal } from "@/components/booking/booking-modal-provider";
import { CONTACT_SECTION_ID, getWhatsAppHref } from "@/constants/contact-config";
import { ROUTES } from "@/constants/routes";
import { Link } from "@/i18n/navigation";
import { handleHashLinkClick, scrollToSection } from "@/utils/scroll-to-section";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

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

/** Concierge CTA — opens WhatsApp via the shared clinic URL. */
export function ConciergeCtaLink({ children, onClick, type = "button", ...props }: ButtonProps) {
  const whatsappHref = getWhatsAppHref();

  return (
    <button
      type={type}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented) return;

        if (whatsappHref) {
          window.open(whatsappHref, "_blank", "noopener,noreferrer");
          return;
        }

        scrollToSection(CONTACT_SECTION_ID);
      }}
      {...props}
    >
      {children}
    </button>
  );
}

/** In-page navigation to the contact section (footer links, etc.). */
export function ContactSectionLink({ children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <Link href={ROUTES.CONTACT} onClick={(event) => handleHashLinkClick(event, ROUTES.CONTACT)} {...props}>
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
