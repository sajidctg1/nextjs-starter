import { AppBreadcrumbs } from "~/components/app-breadcrumb";
import { KBar } from "~/components/dashboard/kbar";
import { AppSidebar } from "~/components/dashboard/sidebar/app-sidebar";
import { ThemeSwitcher } from "~/components/theme-switcher";
import { Separator } from "~/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "~/components/ui/sidebar";
import { constructMetadata } from "~/lib/construct-metadata";
import { authenticate } from "~/server/helpers";

export const metadata = constructMetadata({ title: "Dashboard" });

type Props = {
  children: React.ReactNode;
};

export default async function DashboardLayout({ children }: Props) {
  await authenticate();

  return (
    <KBar>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="sidebar bg-background sticky top-0 z-20 flex h-16 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <div className="inline-flex w-full items-center gap-2 px-4 lg:px-6">
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
              />
              <AppBreadcrumbs />
              <div className="ml-auto inline-flex items-center gap-2">
                <ThemeSwitcher />
              </div>
            </div>
          </header>
          <div className="@container/main">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </KBar>
  );
}
