import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { SignUpForm } from "~/features/auth/components/sign-up";
import { AUTH_URI, UNVERIFIED_EMAIL_COOKIE } from "~/features/auth/constants";

export const metadata = {
  title: "Sign up",
};

export default async function SignUpPage() {
  const cookie = await cookies();
  const email = cookie.get(UNVERIFIED_EMAIL_COOKIE)?.value;
  if (email) return redirect(AUTH_URI.verifyEmail);

  return <SignUpForm />;
}
