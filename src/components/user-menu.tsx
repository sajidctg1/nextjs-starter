"use client";

import { BadgeCheckIcon, BellIcon, CogIcon, LogOutIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { useSession } from "~/features/auth/api/session";
import { useSignOut } from "~/features/auth/api/sign-out";
import { AUTH_URI } from "~/features/auth/constants";

import { UserAvatar } from "./user-avatar";

export const UserMenu = () => {
  const { data } = useSession();
  const user = data?.user;

  const { mutate: signOut } = useSignOut();

  if (!user) {
    return (
      <Button size="sm" asChild>
        <Link href={AUTH_URI.signIn}>
          Sign In
          <span className="sr-only">Sign In</span>
        </Link>
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="icon" className="rounded-full">
          <UserAvatar src={user.image} alt={user.name} className="size-9" />
          <span className="sr-only">Toggle user menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-56" align="end">
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <UserAvatar src={user.image} alt={user.name} />
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">{user.name}</span>
              <span className="truncate text-xs">{user.email}</span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer" asChild>
          <Link href="/dashboard">
            <CogIcon /> Dashboard
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer" asChild>
          <Link href="/account">
            <BadgeCheckIcon /> Account
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer" asChild>
          <Link href="/dashboard">
            <BellIcon /> Notifications
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-destructive cursor-pointer"
          onClick={() => signOut()}
        >
          <LogOutIcon /> Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
