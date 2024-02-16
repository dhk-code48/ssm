import { db } from "@/lib/db";
import React from "react";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";

const SuperAdminGradingSystem = async () => {
  const gradingSystem = await db.gradingSystem.findMany({});
  return (
    <>
      <div className="prose">
        <h2 className="mb-0">Grading Scale Manager</h2>
        <p className="text-sm">View and Manage grading Info's</p>
      </div>
      <div>
        <DataTable columns={columns} data={gradingSystem} />
      </div>
    </>
  );
};

export default SuperAdminGradingSystem;
