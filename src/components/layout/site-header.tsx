import { siteConfig } from "~/configs/site-config";

import { ThemeSwitcher } from "../theme-switcher";
import { Container } from "../ui-ext/container";
import { UserMenu } from "../user-menu";
import { SiteMobileNav } from "./site-mobile-nav";
import { SiteNav } from "./site-nav";

export function SiteHeader() {
  return (
    <header className="bg-background sticky top-0 z-50 w-full border-b">
      <Container className="flex h-16 items-center">
        <SiteNav items={siteConfig.mainNav} />
        <SiteMobileNav items={siteConfig.mainNav} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <ThemeSwitcher />
            <UserMenu />
          </nav>
        </div>
      </Container>
    </header>
  );
}
