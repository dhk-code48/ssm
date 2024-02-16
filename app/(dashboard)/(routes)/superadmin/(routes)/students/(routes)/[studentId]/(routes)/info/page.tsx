import { db } from "@/lib/db";
import React from "react";

const SuperAdminStudentInfo = async ({ params }: { params: { studentId: string } }) => {
  const student = await db.student.findUnique({
    where: {
      id: params.studentId,
    },
    include: {
      grade: true,
      section: true,
    },
  });

  return <div>SuperAdminStudentInfo</div>;
};

export default SuperAdminStudentInfo;
