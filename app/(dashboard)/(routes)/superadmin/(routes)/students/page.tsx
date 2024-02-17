import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import React from "react";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import { auth } from "@/auth";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";

const SuperAdminStudentsPage = async () => {
  const session = await auth();

  if (!session) {
    return redirect("/");
  }

  const grades = await db.grade.findMany({ include: { sections: true } });

  const students = await db.student.findMany({
    include: {
      grade: true,
      section: true,
    },
  });
  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="prose">
          <h2 className="mb-0">Student Manager</h2>
          <p className="text-sm">View and Manage Student Info&apos;s</p>
        </div>
        <div className="flex justify-end items-center flex-1">
          <Link className={buttonVariants()} href="/superadmin/students/bulkregistration">
            Bulk Registration
          </Link>
        </div>
      </div>
      <DataTable grades={grades} columns={columns} data={students} />
    </div>
  );
};

export default SuperAdminStudentsPage;
