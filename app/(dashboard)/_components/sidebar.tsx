import {
  AwardIcon,
  BellIcon,
  BookIcon,
  CalendarIcon,
  ClipboardIcon,
  HomeIcon,
  MessageSquareIcon,
  Package2Icon,
  UsersIcon,
} from "lucide-react";
import { Logo } from "./logo";
import { SidebarRoutes } from "./sidebar-routes";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const Sidebar = () => {
  return (
    <div className="hidden  w-[250px] border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-[60px] items-center border-b px-6">
          <Link className="flex items-center gap-2 font-semibold" href="#">
            <Package2Icon className="h-6 w-6" />
            <p>Acme Inc</p>
          </Link>
          <Button className="ml-auto h-8 w-8" size="icon" variant="outline">
            <BellIcon className="h-4 w-4" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-4 text-sm font-medium">
            <SidebarRoutes />
          </nav>
        </div>
        {/* <div className="mt-auto p-4">
            <Card>
              <CardHeader className="pb-4">
                <CardTitle>Upgrade to Pro</CardTitle>
                <CardDescription>Unlock all features and get unlimited access to our support team</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" size="sm">
                  Upgrade
                </Button>
              </CardContent>
            </Card>
          </div> */}
      </div>
    </div>
  );
};
