import { Heading } from "~/components/ui/heading";
import SettingTabs from "~/features/settings/components/setting-tabs";
import { authenticate } from "~/services/auth/utils";

export default async function AccountPage() {
  await authenticate();

  return (
    <div className="container mx-auto">
      <Heading>Account</Heading>
      <p className="text-muted-foreground text-sm font-semibold">
        Manage your account settings and set e-mail preferences.
      </p>
      <br />
      <SettingTabs />
    </div>
  );
}
