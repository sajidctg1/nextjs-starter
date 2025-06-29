import { adminClient, emailOTPClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

import { siteConfig } from "~/configs/site-config";

export const authClient = createAuthClient({
  baseURL: siteConfig.url,
  plugins: [emailOTPClient(), adminClient()],
  fetchOptions: {
    onError: (ctx) => {
      console.error(ctx.error.message);
    },
  },
});
