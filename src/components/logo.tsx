import Image from "next/image";

export const Logo = (props: { className?: string }) => {
  return (
    <Image
      src="/assets/icon.svg"
      alt="Logo"
      height={40}
      width={150}
      {...props}
    />
  );
};
