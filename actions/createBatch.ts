"use server";

import { BatchSchema } from "@/schemas";
import * as z from "zod";
import { db } from "@/lib/db";

export const createBatch = async (values: z.infer<typeof BatchSchema>) => {
  const validatedFields = BatchSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalidate Data" };
  }

  const { name } = validatedFields.data;

  try {
    await db.batch.create({
      data: {
        name,
      },
    });
  } catch (error) {
    return { error: "Something went wrong" };
  }

  return { success: "New Batch Created Success" };
};
