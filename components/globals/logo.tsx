import { HeartFilledIcon } from "@radix-ui/react-icons";

export function Logo() {
  return (
    <div className="hidden items-center justify-center gap-2 sm:flex">
      <HeartFilledIcon className="h-6 w-6 text-primary" />
      <span>Sacred Shaadi</span>
    </div>
  );
}
