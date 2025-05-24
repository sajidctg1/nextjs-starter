import { SiteHeader } from "~/components/layout/site-header";

type Props = {
  children: React.ReactNode;
};

export default async function AuthLayout({ children }: Props) {
  return (
    <>
      <SiteHeader />
      <main className="flex grow flex-col items-center justify-center gap-8 p-4">
        {children}
      </main>
    </>
  );
}
