import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import React from "react";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import { auth } from "@/auth";

const SuperAdminSubjectPage = async () => {
  const session = await auth();

  if (!session) {
    return redirect("/");
  }

  const subjects = await db.subject.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      sections: true,
    },
  });
  return (
    <>
      <div className="prose">
        <h2 className="mb-0">Subjects Management</h2>
        <p className="text-sm">View and Manage subjects Info&apos;s</p>
      </div>
      <DataTable columns={columns} data={subjects} />
    </>
  );
};

export default SuperAdminSubjectPage;
