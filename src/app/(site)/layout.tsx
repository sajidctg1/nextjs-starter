import { redirect } from "next/navigation";
import React from "react";

import { SiteFooter } from "~/components/layout/site-footer";
import { SiteHeader } from "~/components/layout/site-header";
import { findAnyUser } from "~/server/repositories/user-repository";

type Props = {
  children: React.ReactNode;
};

export default async function WebLayout({ children }: Props) {
  const user = await findAnyUser();
  if (!user?.id) return redirect("/onboarding");

  return (
    <>
      <SiteHeader />
      <main className="flex flex-1 flex-col py-4">{children}</main>
      <SiteFooter />
    </>
  );
}
