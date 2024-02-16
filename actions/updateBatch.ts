"use server";

import { BatchSchema } from "@/schemas";
import * as z from "zod";
import { db } from "@/lib/db";

export const updateBatch = async (values: z.infer<typeof BatchSchema>, batchId: string) => {
  const validatedFields = BatchSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalidate Data" };
  }

  const { name } = validatedFields.data;

  try {
    await db.batch.update({
      where: {
        id: batchId,
      },
      data: {
        name,
      },
    });
  } catch (error) {
    return { error: "Something went wrong" };
  }

  return { success: "Batch Updated Success" };
};
