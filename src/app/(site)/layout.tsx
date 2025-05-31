import React from "react";

import { SiteFooter } from "~/components/layout/site-footer";
import { SiteHeader } from "~/components/layout/site-header";

type Props = {
  children: React.ReactNode;
};

export default function WebLayout({ children }: Props) {
  return (
    <>
      <SiteHeader />
      <main className="flex flex-1 flex-col py-4">{children}</main>
      <SiteFooter />
    </>
  );
}
