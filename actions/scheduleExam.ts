"use server";

import { ExamSchema } from "@/schemas";
import * as z from "zod";
import { db } from "@/lib/db";

export const scheduleExam = async (values: z.infer<typeof ExamSchema>, examId: string) => {
  const validatedFields = ExamSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: validatedFields.error.message || "Invalid Data !" };
  }

  try {
    await db.examSubject.create({
      data: {
        ...validatedFields.data,
        examId,
      },
    });
  } catch (error) {
    console.log("ERRORAT_UPDATETEACHER");
    return { error: "Something went wrong" };
  }

  return { success: "Teacher Created Success" };
};
