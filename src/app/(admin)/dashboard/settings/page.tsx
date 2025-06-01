import { Container } from "~/components/ui/container";
import SettingTabs from "~/features/settings/components/setting-tabs";

export const metadata = {
  title: "Settings | Dashboard",
};

export default function SettingsPage() {
  return (
    <Container className="max-w-6xl">
      <SettingTabs />
    </Container>
  );
}
