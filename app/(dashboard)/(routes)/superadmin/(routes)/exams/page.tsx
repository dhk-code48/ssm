import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import React from "react";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import { auth } from "@/auth";

const SuperAdminExamsPage = async () => {
  const session = await auth();

  if (!session) {
    return redirect("/");
  }

  const grades = await db.grade.findMany({ include: { sections: true } });

  const exams = await db.exam.findMany({
    include: {
      grade: true,
    },
  });

  return (
    <div>
      <div className="prose">
        <h2 className="mb-0">Exams Management</h2>
        <p className="text-sm">View and Manage exams Info's</p>
      </div>
      <DataTable grades={grades} columns={columns} data={exams} />
    </div>
  );
};

export default SuperAdminExamsPage;
