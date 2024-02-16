import React from "react";
import ExamForm from "./_components/exam-form";
import { db } from "@/lib/db";
import { SuperAdminExamSubject } from "./_components/exam-subject";

const SuperAdminTeacherPage = async ({ params }: { params: { examId: string } }) => {
  const exam = await db.exam.findUnique({
    where: {
      id: params.examId,
    },
    include: {
      subjects: {
        orderBy: {
          position: "asc",
        },
        include: {
          subject: true,
        },
      },
    },
  });
  const grades = await db.grade.findMany({});
  const subjects = await db.subject.findMany({});
  return (
    <div className="grid grid-col p-6 items-center mt-auto w-full">
      <h1 className="text-2xl font-semibold tracking-tight">
        {exam ? "Update Exam Info" : "Add New Exam"}
      </h1>
      <p className="text-sm text-muted-foreground">Create and modify exams</p>

      <ExamForm
        grades={grades}
        exam={exam}
        studentId={params.examId}
        className="lg:w-[400px] mt-10"
      />
      {exam && <SuperAdminExamSubject subjects={subjects} examData={exam} grades={grades} />}
    </div>
  );
};

export default SuperAdminTeacherPage;
