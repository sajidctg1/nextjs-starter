import { Container } from "~/components/ui-ext/container";
import SettingTabs from "~/features/settings/components/setting-tabs";

export const metadata = {
  title: "Settings | Dashboard",
};

export default async function SettingsPage() {
  return (
    <Container className="max-w-6xl">
      <SettingTabs />
    </Container>
  );
}
