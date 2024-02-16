"use server";
import { db } from "@/lib/db";

export const deleteStudent = async (studentId: string) => {
  try {
    await db.student.delete({
      where: {
        id: studentId,
      },
    });
  } catch (error) {
    return { error: "Something went wrong" };
  }

  return { success: "Student Deleated Success" };
};
