"use server";

import { ExamSubjectSchema } from "@/schemas";
import * as z from "zod";
import { db } from "@/lib/db";

export const updateExamSubject = async (
  values: z.infer<typeof ExamSubjectSchema>,
  examSubjectId: string
) => {
  const validatedFields = ExamSubjectSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalidate Data" };
  }

  const { subjectId, examId, date, TfullMarks, TPassMarks, PfullMarks, PpassMarks, position } =
    validatedFields.data;

  try {
    await db.examSubject.update({
      where: {
        id: examSubjectId,
      },
      data: {
        subjectId,
        examId,
        date,
        TfullMarks,
        TPassMarks,
        PfullMarks,
        PpassMarks,
        position,
      },
    });
  } catch (error) {
    console.log("ERROR HERE", error);
    return { error: "Something went wrong " + error };
  }

  return { success: "Exam Subject Updated Success" };
};
