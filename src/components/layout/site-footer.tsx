import Link from "next/link";

import { siteConfig } from "~/configs/site-config";

import { Logo } from "../logo";
import { Container } from "../ui-ext/container";
import { Heading } from "../ui-ext/heading";

export const SiteFooter = () => {
  return (
    <footer className="bg-background w-full border-t py-10">
      <Container>
        <section className="flex flex-col gap-10 xl:flex-row xl:gap-20">
          <div className="xl:min-w-xs">
            <Link href="/" className="flex w-fit items-center gap-2">
              <Logo className="size-6" aria-hidden="true" />
              <span className="font-bold">{siteConfig.name}</span>
              <span className="sr-only">Home</span>
            </Link>
          </div>
          <div className="grid flex-1 grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-4">
            {siteConfig.footerNav.map((item) => (
              <div key={item.title} className="space-y-4">
                <Heading tag="h5">{item.title}</Heading>
                <ul className="space-y-2">
                  {item.items.map((link) => (
                    <li key={link.title}>
                      <Link
                        href={link.href}
                        target={link?.external ? "_blank" : undefined}
                        rel={link?.external ? "noreferrer" : undefined}
                        className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                      >
                        {link.title}
                        <span className="sr-only">{link.title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
        <section className="mt-14 flex items-center justify-center">
          <p className="text-gray-500 dark:text-gray-400">
            Copyright © {siteConfig.copywriteYears} {siteConfig.companyName} •
            All right reserved
          </p>
        </section>
      </Container>
    </footer>
  );
};
