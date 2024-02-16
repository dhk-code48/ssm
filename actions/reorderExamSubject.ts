"use server";

import { db } from "@/lib/db";

export async function reorderExamSubject(list: { id: string; position: number }[]) {
  try {
    for (let item of list) {
      await db.examSubject.update({
        where: { id: item.id },
        data: { position: item.position },
      });
    }

    return { success: "Success" };
  } catch (error) {
    console.log("[REORDER]", error);
    return { error: "ERROR : " + error };
  }
}
