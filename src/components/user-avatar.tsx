import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { cn } from "~/lib/utils";

interface Props {
  src?: string | null;
  alt?: string | null;
  className?: string;
}

export const UserAvatar = ({ src, alt, className }: Props) => {
  return (
    <Avatar className={cn("size-8 rounded-lg", className)}>
      <AvatarImage src={src || undefined} alt={alt || undefined} />
      <AvatarFallback className="rounded-lg">CN</AvatarFallback>
    </Avatar>
  );
};
