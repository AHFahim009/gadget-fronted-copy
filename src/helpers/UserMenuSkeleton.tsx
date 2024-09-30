import { Button } from "@/components/ui/button";

const UserMenuSkeleton = () => {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-full w-10 h-10"
    >
      <span className="sr-only">Open user menu</span>
    </Button>
  );
};
export default UserMenuSkeleton;
