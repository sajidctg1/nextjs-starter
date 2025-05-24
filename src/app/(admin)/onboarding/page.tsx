import { notFound } from "next/navigation";

import { Logo } from "~/components/logo";
import { ThemeSwitcher } from "~/components/theme-switcher";
import { Container } from "~/components/ui-ext/container";
import { Heading } from "~/components/ui-ext/heading";
import { siteConfig } from "~/configs/site-config";
import { OnboardingForm } from "~/features/onboarding/components/onboarding-form";
import { findAnyUser } from "~/server/repositories/user-repository";

export default async function OnboardingPage() {
  const user = await findAnyUser();
  if (user) return notFound();

  return (
    <Container className="bg-background flex-1 place-content-center space-y-8">
      <div className="flex w-full justify-end">
        <ThemeSwitcher />
      </div>
      <div className="bg-card min-w-md rounded-md border p-10 shadow-md">
        <div className="mb-10 flex flex-col items-center justify-center gap-2">
          <Logo className="size-8" />
          <Heading>Welcome to {siteConfig.name}</Heading>
          <p className="text-muted-foreground text-sm">Create a Admin user</p>
        </div>
        <OnboardingForm />
      </div>
    </Container>
  );
}
