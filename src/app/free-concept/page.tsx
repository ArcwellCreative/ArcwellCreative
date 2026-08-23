import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import { FreeConceptOffer } from "@/components/FreeConceptOffer";

export const metadata: Metadata = {
  title: `Free Concept | ${siteConfig.name}`,
  description:
    "Request a complimentary design concept for your business — no obligation, no hard sell.",
};

export default function FreeConceptPage() {
  return <FreeConceptOffer />;
}
