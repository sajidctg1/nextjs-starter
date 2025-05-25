"use client";

import { Input } from "~/components/ui/input";
import { ButtonLoading } from "~/components/ui-ext/button-loading";
import { authClient } from "~/lib/auth-client";

export const EmailSettingsForm = () => {
  const { data: auth } = authClient.useSession();

  return (
    <div className="grid gap-6 space-y-0 md:grid-cols-2">
      <div className="md:col-span-2">
        <Input disabled={true} value={auth?.user.email} />
      </div>
      <div className="md:col-span-2">
        <ButtonLoading loading={false}>Update</ButtonLoading>
      </div>
    </div>
  );
};
