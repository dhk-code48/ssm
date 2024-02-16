"use server";

import { db } from "@/lib/db";

export const deleteGradingSystem = async (gradingSystemId: string) => {
  try {
    await db.gradingSystem.delete({
      where: {
        id: gradingSystemId,
      },
    });
  } catch (error) {
    return { error: "Something went wrong" };
  }

  return { success: "Grading System Updated Success" };
};
