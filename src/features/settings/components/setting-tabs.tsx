"use client";

import { useQueryState } from "nuqs";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

import { AccountSettings } from "./account";
import { AppearanceSettings } from "./appearance-settings";
import { NotificationSettings } from "./notification-settings";
import { SecuritySettings } from "./security";

const tabs = {
  Account: "Account",
  Security: "Security",
  Appearance: "Appearance",
  Notifications: "Notifications",
} as const;

export default function SettingTabs() {
  const [activeTab, setActiveTab] = useQueryState("active-tab", {
    defaultValue: tabs.Account,
  });

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="mb-2">
        {Object.values(tabs).map((item) => (
          <TabsTrigger key={item} value={item}>
            {item}
          </TabsTrigger>
        ))}
      </TabsList>
      <TabsContent value={tabs.Account}>
        <AccountSettings />
      </TabsContent>
      <TabsContent value={tabs.Security}>
        <SecuritySettings />
      </TabsContent>
      <TabsContent value={tabs.Appearance}>
        <AppearanceSettings />
      </TabsContent>
      <TabsContent value={tabs.Notifications}>
        <NotificationSettings />
      </TabsContent>
    </Tabs>
  );
}
