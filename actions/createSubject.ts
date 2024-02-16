"use server";

import { SubjectSchema } from "@/schemas";
import * as z from "zod";
import { db } from "@/lib/db";

export const createSubject = async (values: z.infer<typeof SubjectSchema>) => {
  const validatedFields = SubjectSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalidate Data" };
  }

  const { name, subjectCode, optional } = validatedFields.data;

  try {
    await db.subject.create({
      data: {
        name,
        subjectCode,
        optional,
      },
    });
  } catch (error) {
    return { error: "Something went wrong" };
  }

  return { success: "Grade Created Success" };
};
