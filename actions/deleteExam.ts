"use server";
import { db } from "@/lib/db";

export const deleteExam = async (examId: string) => {
  try {
    await db.exam.delete({
      where: {
        id: examId,
      },
    });
  } catch (error) {
    return { error: "Delete all the things realted to this exam first" };
  }

  return { success: "Grade Deleated Success" };
};
