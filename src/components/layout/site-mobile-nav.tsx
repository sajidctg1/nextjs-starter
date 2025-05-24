"use client";

import { MenuIcon } from "lucide-react";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import * as React from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { Button } from "~/components/ui/button";
import { ScrollArea } from "~/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";
import { siteConfig } from "~/configs/site-config";
import { useMediaQuery } from "~/hooks/use-media-query";
import { cn } from "~/lib/utils";

import { Logo } from "../logo";
import { Heading } from "../ui-ext/heading";

interface MobileNavProps {
  items?: MainNavItem[];
}

export const SiteMobileNav = ({ items }: MobileNavProps) => {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const segment = useSelectedLayoutSegment();
  const [open, setOpen] = React.useState(false);

  if (isDesktop) return null;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="size-5 hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 lg:hidden"
        >
          <MenuIcon aria-hidden="true" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>
            <Link
              href="/"
              className="flex items-center"
              onClick={() => setOpen(false)}
            >
              <Logo className="mr-2 size-6" aria-hidden="true" />
              <Heading tag="h4">{siteConfig.name}</Heading>
              <span className="sr-only">Home</span>
            </Link>
          </SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-8rem)] pb-10 pl-6 font-semibold">
          <div className="pr-8 pl-2">
            {items?.map((item) =>
              item.items ? (
                <Accordion key={item.title} type="multiple">
                  <AccordionItem value={item.title}>
                    <AccordionTrigger className="hover:text-foreground text-muted-foreground size-auto p-0 py-2 text-base font-semibold capitalize">
                      {item.title}
                    </AccordionTrigger>
                    <AccordionContent className="flex flex-col p-0">
                      {item.items?.map((subItem, index) =>
                        subItem.href ? (
                          <MobileLink
                            key={index}
                            href={String(subItem.href)}
                            segment={String(segment)}
                            setOpen={setOpen}
                            disabled={subItem.disabled}
                            className="ml-2"
                          >
                            {subItem.title}
                          </MobileLink>
                        ) : (
                          <div
                            key={subItem.title}
                            className="text-foreground/70 transition-colors"
                          >
                            {item.title}
                          </div>
                        )
                      )}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              ) : (
                <div key={item.title}>
                  <MobileLink
                    href={String(item.href)}
                    segment={String(segment)}
                    setOpen={setOpen}
                    disabled={item.disabled}
                  >
                    {item.title}
                  </MobileLink>
                </div>
              )
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

interface MobileLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  disabled?: boolean;
  segment: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function MobileLink({
  children,
  href,
  disabled,
  segment,
  setOpen,
  className,
  ...props
}: MobileLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "text-muted-foreground hover:text-foreground inline-block py-2 transition-colors",
        href.includes(segment) && "text-foreground",
        disabled && "pointer-events-none opacity-60",
        className
      )}
      onClick={() => setOpen(false)}
      {...props}
    >
      {children}
    </Link>
  );
}
