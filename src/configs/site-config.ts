import { env } from "~/env";

const currentYear = new Date().getFullYear().toString();
const websiteLaunchYear = "2025";

const links = {
  x: "https://twitter.com/sajidctg1",
  github: "https://github.com/sajid-dev-01/nextjs-starter",
  githubAccount: "https://github.com/sajid-dev-01",
};

export const siteConfig = {
  name: env.NEXT_PUBLIC_APP_NAME,
  url: env.NEXT_PUBLIC_APP_URL,
  locale: "en-US",
  language: "en-us",
  description: "A simple next.js starter template",
  companyName: env.NEXT_PUBLIC_COMPANY_NAME,
  companyAddr: "123 Main St, Anytown, ST 12345",
  copywriteYears:
    currentYear === websiteLaunchYear
      ? currentYear
      : `${websiteLaunchYear}-${currentYear}`,
  author: {
    github: "https://github.com/sajid-dev-01",
    twitter: "@sajidctg1",
  },
  links,
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Lobby",
      items: [
        {
          title: "Products",
          href: "/products",
          description: "All the products we have to offer.",
          items: [],
        },
        {
          title: "Blog",
          href: "/blog",
          description: "Read our latest blog posts.",
          items: [],
        },
      ],
    },
    {
      title: "Fetures",
      href: "/",
    },
    {
      title: "About",
      href: "/",
    },
  ] satisfies MainNavItem[],
  footerNav: [
    {
      title: "Follow",
      items: [
        {
          title: "GitHub",
          href: links.githubAccount,
          external: true,
        },
        {
          title: "Instagram",
          href: links.x,
          external: true,
        },
        {
          title: "X",
          href: links.x,
          external: true,
        },
      ],
    },
    {
      title: "Platforms",
      items: [
        {
          title: "Web",
          href: "#",
          external: false,
        },
        {
          title: "Mobile",
          href: "#",
          external: false,
        },
        {
          title: "Desktop",
          href: "#",
          external: false,
        },
      ],
    },
    {
      title: "Help",
      items: [
        {
          title: "About",
          href: "/about",
          external: false,
        },
        {
          title: "Contact",
          href: "/contact",
          external: false,
        },
        {
          title: "Terms",
          href: "/terms",
          external: false,
        },
        {
          title: "Privacy",
          href: "/privacy",
          external: false,
        },
      ],
    },
    {
      title: "Community",
      items: [
        {
          title: "Discord",
          href: links.githubAccount,
          external: true,
        },
        {
          title: "GitHub",
          href: links.githubAccount,
          external: true,
        },
        {
          title: "Youtube",
          href: links.githubAccount,
          external: true,
        },
      ],
    },
  ] satisfies FooterItem[],
};
