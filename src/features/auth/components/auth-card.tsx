import Link from "next/link";

import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

import Social from "./social";

interface Props {
  children: React.ReactNode;
  title: string;
  desc?: string | React.ReactNode;
  buttonLabel?: string;
  buttonHref?: string;
  showSocial?: boolean;
}

export const AuthCard = ({
  children,
  title: headerTitle,
  desc: headerDesc,
  buttonLabel: bottomButtonLabel,
  buttonHref: bottomButtonHref,
  showSocial,
}: Props) => {
  return (
    <Card className="max-w-xl min-w-[320px] shadow-md">
      <CardHeader className="text-center">
        <CardTitle>{headerTitle}</CardTitle>
        {headerDesc && <CardDescription>{headerDesc}</CardDescription>}
      </CardHeader>
      <CardContent>
        {showSocial && <Social />}
        {children}
      </CardContent>
      {bottomButtonHref && bottomButtonLabel && (
        <CardFooter className="justify-center">
          <Button variant="link" className="font-normal" size="sm" asChild>
            <Link href={bottomButtonHref}>{bottomButtonLabel}</Link>
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};
