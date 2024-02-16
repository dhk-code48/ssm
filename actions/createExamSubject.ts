"use server";

import { ExamSubjectSchema } from "@/schemas";
import * as z from "zod";
import { db } from "@/lib/db";

export const createExamSubject = async (values: z.infer<typeof ExamSubjectSchema>) => {
  const validatedFields = ExamSubjectSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalidate Data" };
  }

  const { subjectId, examId, date, TfullMarks, TPassMarks, PfullMarks, PpassMarks, position } =
    validatedFields.data;

  try {
    await db.examSubject.create({
      data: {
        subjectId,
        examId,
        date,
        TfullMarks,
        TPassMarks,
        PfullMarks,
        position,
        PpassMarks,
      },
    });
  } catch (error) {
    return { error: "Something went wrong" };
  }

  return { success: "Exam Created Success" };
};
