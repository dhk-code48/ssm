"use server";

import { ExamSchema } from "@/schemas";
import * as z from "zod";
import { db } from "@/lib/db";

export const createExam = async (values: z.infer<typeof ExamSchema>) => {
  const validatedFields = ExamSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalidate Data" };
  }

  const { name, endingDate, gradeId, startingDate, batchId } = validatedFields.data;

  try {
    await db.exam.create({
      data: {
        name,
        endingDate,
        batchId,
        gradeId,
        startingDate,
      },
    });
  } catch (error) {
    return { error: "Something went wrong" };
  }

  return { success: "Exam Created Success" };
};
