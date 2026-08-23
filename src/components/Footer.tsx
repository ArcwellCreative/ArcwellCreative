"use client";

import Image from "next/image";
import Link from "next/link";
import { contactInformation, navigation, socialLinks } from "@/lib/site-config";
import { handleHashLinkClick } from "@/lib/scroll";

// Lean placeholder wireframe globe, arc-motif rings echoing the logo mark —
// swap for a real illustration/reference later
function SpinningGlobe() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5 shrink-0 animate-[spin_16s_linear_infinite] text-copper-light"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1" />
      <path
        d="M3 9.5C5.5 8 8.5 7.2 12 7.2s6.5.8 9 2.3M3 14.5c2.5 1.5 5.5 2.3 9 2.3s6.5-.8 9-2.3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      />
      <path
        d="M12 3c-2.2 2.3-3.4 5.5-3.4 9s1.2 6.7 3.4 9c2.2-2.3 3.4-5.5 3.4-9s-1.2-6.7-3.4-9Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      />
    </svg>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink py-16 sm:py-20">
      <div className="container-arc">
        <div className="flex flex-col gap-12 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <Image
              src="/arcwell-logo-light.png"
              alt="Arcwell Creative"
              width={600}
              height={121}
              style={{ height: "auto" }}
              className="w-[100px]"
            />
            <p className="text-body mt-5 max-w-[26ch] text-cream/60">
              Websites, brands &amp; design for businesses ready to stand
              out.
            </p>
            <p className="text-body mt-2 max-w-[26ch] text-cream/60">
              Local roots, national reach. Shaping what&apos;s next in
              creativity.
            </p>
            <div className="mt-4 flex items-center gap-2.5">
              <SpinningGlobe />
              <span className="label text-cream/60">United States</span>
            </div>
          </div>

          <nav className="flex flex-wrap gap-x-10 gap-y-3" aria-label="Footer">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={(e) => handleHashLinkClick(e, item.href)}
                className="label text-cream/65 transition-colors hover:text-cream"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* REPLACE WITH REAL ARCWELL SOCIAL LINKS — currently none configured */}
          {socialLinks.length > 0 && (
            <div className="flex gap-6">
              {socialLinks.map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="label text-cream/65 transition-colors hover:text-cream"
                >
                  {social.label}
                </a>
              ))}
            </div>
          )}
        </div>

        <div className="mt-16 flex flex-col-reverse items-start gap-4 border-t border-cream/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-body text-cream/50">
            © {year} Arcwell Creative. All rights reserved.
          </p>
          <a
            href={`mailto:${contactInformation.email}`}
            className="text-body text-cream/50 transition-colors hover:text-cream"
          >
            {contactInformation.email}
          </a>
        </div>
      </div>
    </footer>
  );
}
