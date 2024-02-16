"use server";

import { GradingSystemSchema } from "@/schemas";
import * as z from "zod";
import { db } from "@/lib/db";

export const createGradingSystem = async (values: z.infer<typeof GradingSystemSchema>) => {
  const validatedFields = GradingSystemSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalidate Data" };
  }

  const { name, percentageFrom, percentageTo, point, remarks } = validatedFields.data;

  try {
    await db.gradingSystem.create({
      data: {
        name,
        percentageFrom,
        percentageTo,
        point,
        remarks,
      },
    });
  } catch (error) {
    return { error: "Something went wrong" };
  }

  return { success: "Grading System Created Success" };
};
