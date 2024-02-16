import { redirect } from "next/navigation";
import React from "react";
import { auth } from "@/auth";
import ExamFilterForm from "./_components/exam-filter-form";
import { db } from "@/lib/db";
import { Exam, Grade } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

const SuperAdminResultPage = async () => {
  const session = await auth();

  const grades = await db.grade.findMany({
    include: {
      exams: {
        include: {
          results: true,
          subjects: {
            include: {
              subject: true,
            },
            orderBy: {
              position: "asc",
            },
          },
        },
      },
    },
  });

  if (!session) {
    return redirect("/");
  }

  return (
    <div className="space-y-10 overd">
      <div className="flex flex-wrap space-y-3 justify-between items-center w-full">
        <div className="prose">
          <h2 className="mb-0">Results Management</h2>
          <p className="text-sm">View and Manage reluts Info's</p>
        </div>
        <Button className="gap-x-3">
          <Download size={16} />
          Download Excel Sample
        </Button>
      </div>
      <ExamFilterForm grades={grades} />
    </div>
  );
};

export default SuperAdminResultPage;
