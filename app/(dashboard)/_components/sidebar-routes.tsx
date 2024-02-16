"use client";

import {
  BarChart,
  Compass,
  Layout,
  Backpack,
  User,
  Users,
  ChevronsUpDown,
  ArrowDown,
  ArrowDown01,
  LucideAArrowDown,
  GraduationCap,
  Inbox,
  Book,
  FileSpreadsheet,
  BookText,
  NotebookText,
  Notebook,
  LineChart,
  ScrollText,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

import { SidebarItem } from "./sidebar-item";
import { Button } from "@/components/ui/button";
import { Icon } from "@radix-ui/react-select";
import { cn } from "@/lib/utils";

const guestRoutes = [
  {
    icon: Layout,
    label: "Dashboard",
    routes: [
      {
        icon: User,
        label: "",
        href: "/superadmin/student",
      },
    ],
  },
  {
    icon: Compass,
    label: "Worksheets",
    routes: [
      {
        icon: User,
        label: "",
        href: "/superadmin/student",
      },
    ],
  },
];

const teacherRoutes = [
  {
    icon: Backpack,
    label: "Sections",
    routes: [
      {
        icon: User,
        label: "",
        href: "/superadmin/student",
      },
    ],
  },
  {
    icon: BarChart,
    label: "Analytics",
    routes: [
      {
        icon: User,
        label: "",
        href: "/superadmin/student",
      },
    ],
  },
];
const superAdminRoutes = [
  {
    icon: Users,
    label: "Student And Staff",
    routes: [
      {
        icon: User,
        label: "Student",
        href: "/superadmin/students",
      },
      {
        icon: User,
        label: "Teachers",
        href: "/superadmin/teachers",
      },
    ],
  },
  {
    icon: GraduationCap,
    label: "Academic",
    routes: [
      {
        icon: BookText,
        label: "Grades/Class",
        href: "/superadmin/grades",
      },
      {
        icon: FileSpreadsheet,
        label: "Grading System",
        href: "/superadmin/gradingsystem",
      },
      {
        icon: NotebookText,
        label: "Subjects/Course",
        href: "/superadmin/subjects",
      },
      {
        icon: Inbox,
        label: "Batch",
        href: "/superadmin/batch",
      },
    ],
  },
  {
    icon: Notebook,
    label: "Exams And Results",
    routes: [
      {
        icon: LineChart,
        label: "Exams",
        href: "/superadmin/exams",
      },
      {
        icon: ScrollText,
        label: "Results",
        href: "/superadmin/results",
      },
    ],
  },
];

export const SidebarRoutes = () => {
  const pathname = usePathname();

  const isTeacherPage = pathname?.includes("/teacher");
  const isSuperAdminPage = pathname?.includes("/superadmin");

  const routes = isSuperAdminPage ? superAdminRoutes : isTeacherPage ? teacherRoutes : guestRoutes;

  return (
    <div className="flex flex-col w-full">
      {routes.map((route) => {
        const Icon = route.icon;
        return (
          <Collapsible
            key={route.label}
            className="w-full space-y-2 flex flex-col items-center text-slate-500 text-sm font-[500] pl-2 transition-all hover:text-slate-600"
          >
            <CollapsibleTrigger asChild className="py-3 w-full hover:bg-slate-300/20">
              {/* {route.icon} */}
              <div className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-900  transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50">
                <Icon className="w-4 h-4" />

                {route.label}
              </div>
            </CollapsibleTrigger>

            <CollapsibleContent className="space-y-2 w-full px-2">
              {route.routes.map((childroute) => {
                return (
                  <SidebarItem
                    href={childroute.href}
                    icon={childroute.icon}
                    label={childroute.label}
                    key={childroute.label}
                  />
                );
              })}
            </CollapsibleContent>
          </Collapsible>
        );
      })}
    </div>
  );
};
