"use server";
import { db } from "@/lib/db";

export const deleteGrade = async (gradeId: string) => {
  try {
    await db.grade.delete({
      where: {
        id: gradeId,
      },
    });
  } catch (error) {
    return { error: "Delete all the section and exams realted to this gradefirst" };
  }

  return { success: "Grade Deleated Success" };
};
