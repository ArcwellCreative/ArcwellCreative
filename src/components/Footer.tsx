"use client";

import Image from "next/image";
import Link from "next/link";
import { navigation, socialLinks } from "@/lib/site-config";
import { handleHashLinkClick } from "@/lib/scroll";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-graphite py-16 sm:py-20">
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
            <p className="text-body mt-5 max-w-[26ch] text-cream/45">
              Websites, brands &amp; design for businesses ready to stand
              out.
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-10 gap-y-3" aria-label="Footer">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={(e) => handleHashLinkClick(e, item.href)}
                className="label text-cream/55 transition-colors hover:text-cream"
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
                  className="label text-cream/55 transition-colors hover:text-cream"
                >
                  {social.label}
                </a>
              ))}
            </div>
          )}
        </div>

        <div className="mt-16 flex flex-col-reverse items-start gap-4 border-t border-cream/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-body text-cream/35">
            © {year} Arcwell Creative. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
