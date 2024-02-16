"use server";

import { StudentSchema } from "@/schemas";
import * as z from "zod";
import { db } from "@/lib/db";

export const createStudent = async (values: z.infer<typeof StudentSchema>) => {
  const validatedFields = StudentSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalidate Data" };
  }

  const {
    firstName,
    email,
    sectionId,
    batch,
    country,
    dob,
    lastName,
    middleName,
    mobileNumber,
    permanentAddress,
    regesteredAt,
    registrationNumber,
    temporaryAddress,
    gradeId,
    image,
  } = validatedFields.data;

  try {
    await db.student.create({
      data: {
        firstName,
        email,
        sectionId,
        batch,
        country,
        dob,
        lastName,
        middleName: middleName ? middleName : "",
        mobileNumber,
        permanentAddress,
        regesteredAt,
        registrationNumber,
        temporaryAddress,
        gradeId,
        image,
      },
    });
  } catch (error) {
    return { error: "Something went wrong" };
  }

  return { success: "Student Created Success" };
};
