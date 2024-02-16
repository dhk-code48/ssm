import { auth } from "@/auth";
import { redirect } from "next/navigation";
import React, { FC } from "react";
import { Navbar } from "./_components/navbar";
import { Sidebar } from "./_components/sidebar";

const DashboardLayout: FC<{ children: React.ReactNode }> = async ({ children }) => {
  const session = await auth();
  if (!session) {
    redirect("/auth/login");
  }
  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[250px_1fr]">
      <Sidebar />
      <div className="flex flex-col">
        <Navbar />
        <main className="h-full max-w-[calc(100vw-280px)] overflow-x-scroll">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
