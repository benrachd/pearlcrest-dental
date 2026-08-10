import { contactConfig, isInquiryEndpointConfigured } from "@/constants/contact-config";

export type BookingInquiryPayload = {
  fullName: string;
  email: string;
  phone: string;
  service: string;
  message: string;
};

export async function submitBookingInquiry(payload: BookingInquiryPayload): Promise<boolean> {
  if (!isInquiryEndpointConfigured()) {
    return true;
  }

  try {
    const response = await fetch(contactConfig.inquiryEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        ...payload,
        source: "pearlcrest-dental-booking-modal",
      }),
    });

    return response.ok;
  } catch {
    return false;
  }
}
