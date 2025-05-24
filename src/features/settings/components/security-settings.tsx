"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { LaptopIcon, Loader2Icon, LogOutIcon, PhoneIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { UAParser } from "ua-parser-js";

import { FormInput } from "~/components/form/form-input";
import { GenericForm } from "~/components/form/generic-form";
import { Badge } from "~/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";
import { ButtonLoading } from "~/components/ui-ext/button-loading";
import { authClient } from "~/lib/auth-client";

import { useChangePassword } from "../api/change-password";
import { useListSessions } from "../api/list-sessions";
import { useAllRevokeSession, useRevokeSession } from "../api/revoke-session";
import { type UpdatePasswordPayload, updatePasswordSchema } from "../schemas";

export default function SecuritySettings() {
  const { data: currentSession } = authClient.useSession();
  const { data: sessions, isPending } = useListSessions();

  const { mutate: revokeAllSession, isPending: isTerminatingAll } =
    useAllRevokeSession();
  const { mutate: revokeSession, isPending: isTerminating } =
    useRevokeSession();
  const { mutate: changePassword, isPending: isUpdatingPass } =
    useChangePassword();

  const form = useForm<UpdatePasswordPayload>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      currentPassword: "12345678",
      password: "12345678",
      confirmPassword: "12345678",
    },
  });

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Password</CardTitle>
          <CardDescription>Update your current password</CardDescription>
        </CardHeader>
        <CardContent>
          <GenericForm
            {...form}
            onSubmit={(v) =>
              changePassword({
                currentPassword: v.currentPassword,
                newPassword: v.password,
              })
            }
          >
            <FormInput<UpdatePasswordPayload>
              name="currentPassword"
              label="Current Password"
              type="password"
              disabled={isUpdatingPass}
            />
            <FormInput<UpdatePasswordPayload>
              name="password"
              label="New Password"
              type="password"
              disabled={isUpdatingPass}
            />
            <FormInput<UpdatePasswordPayload>
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              disabled={isUpdatingPass}
            />
            <ButtonLoading loading={isUpdatingPass}>Update</ButtonLoading>
          </GenericForm>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Sessions</CardTitle>
          <CardDescription>
            Manage your active sessions across devices
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {isPending ? (
            <div className="flex min-h-20 items-center justify-center">
              <Loader2Icon className="size-10 animate-spin" />
            </div>
          ) : (
            sessions?.map((session) => {
              const ua = new UAParser(session.userAgent ?? "");
              return (
                <div key={session.id}>
                  <div className="flex gap-4">
                    {ua.getDevice().type === "mobile" ? (
                      <PhoneIcon className="size-10" />
                    ) : (
                      <LaptopIcon className="size-10" />
                    )}
                    <div className="text-muted-foreground space-y-1 text-sm">
                      <p className="text-foreground flex gap-2 text-base font-semibold">
                        {ua.getOS().name} ({ua.getCPU().toString()})
                        {session.id === currentSession?.session.id && (
                          <Badge>This Device</Badge>
                        )}
                      </p>
                      <p>
                        {ua?.getBrowser().name} • {ua?.getBrowser().version}
                      </p>
                      <p className="text-xs">
                        IP:
                        {`${session.ipAddress ?? "Unknown"} ${session.createdAt.toDateString()} ${session.createdAt.toLocaleTimeString()}`}
                      </p>
                    </div>
                    {session.id !== currentSession?.session.id && (
                      <ButtonLoading
                        loading={isTerminating}
                        size="sm"
                        variant="destructive"
                        className="ml-auto"
                        onClick={() => revokeSession({ token: session.token })}
                      >
                        <LogOutIcon className="mr-1 h-4 w-4" />
                        Revoke
                      </ButtonLoading>
                    )}
                  </div>
                  <Separator className="mt-4" />
                </div>
              );
            })
          )}
          <div className="flex justify-between">
            <p className="text-muted-foreground text-xs">
              Last checked: {new Date().toDateString()}
            </p>
            <ButtonLoading
              loading={isTerminatingAll}
              variant="destructive"
              size="sm"
              disabled={sessions?.length === 0}
              onClick={() => revokeAllSession()}
            >
              Revoke All Sessions
            </ButtonLoading>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
