"use server";

import { StudentSchema } from "@/schemas";
import * as z from "zod";
import { db } from "@/lib/db";

export const updateStudent = async (values: z.infer<typeof StudentSchema>, studentId: string) => {
  const validatedFields = StudentSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: validatedFields.error.message || "Invalid Data !" };
  }

  try {
    await db.student.update({
      where: {
        id: studentId,
      },
      data: {
        ...validatedFields.data,
      },
    });
  } catch (error) {
    console.log("ERRORAT_UPDATETEACHER");
    return { error: "Something went wrong" };
  }

  return { success: "Student Updated Success" };
};
