"use server";

import { ExamSchema } from "@/schemas";
import * as z from "zod";
import { db } from "@/lib/db";

export const updateExam = async (values: z.infer<typeof ExamSchema>, examId: string) => {
  const validatedFields = ExamSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalidate Data" };
  }

  const { name, endingDate, gradeId, startingDate } = validatedFields.data;

  try {
    await db.exam.update({
      where: {
        id: examId,
      },
      data: {
        name,
        endingDate,
        gradeId,
        startingDate,
      },
    });
  } catch (error) {
    return { error: "Something went wrong" };
  }

  return { success: "Exam Updated Success" };
};
