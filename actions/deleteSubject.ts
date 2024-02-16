"use server";
import { db } from "@/lib/db";

export const deleteSubject = async (subjectId: string) => {
  try {
    await db.subject.delete({
      where: {
        id: subjectId,
      },
    });
  } catch (error) {
    return { error: "Something went wrong" };
  }

  return { success: "Subject Deleated Success" };
};
