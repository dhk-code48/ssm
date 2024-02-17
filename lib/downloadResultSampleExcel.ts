"use server";

import { redirect } from "next/navigation";
import { createheaderrow } from "./create-excel-headerrow";
import { ExamSubject, Subject } from "@prisma/client";
import { db } from "./db";

const writeXlsxFile = require("write-excel-file/node");
const DEFAULT_HEADER_ROW = [
  {
    value: "Name",
    fontWeight: "bold",
  },
  {
    value: "Date of Birth",
    fontWeight: "bold",
  },
  {
    value: "Cost",
    fontWeight: "bold",
  },
  {
    value: "Paid",
    fontWeight: "bold",
  },
];

const DATA_ROW_1 = [
  // "Name"
  {
    type: String,
    value: "John Smith",
  },

  // "Date of Birth"
  {
    type: Date,
    value: new Date(),
    format: "mm/dd/yyyy",
  },

  // "Cost"
  {
    type: Number,
    value: 1800,
  },

  // "Paid"
  {
    type: Boolean,
    value: true,
  },
];

const data = [DEFAULT_HEADER_ROW, DATA_ROW_1];
export const downloadFile = async (
  selectedGrade: string,
  selectedSection: string,
  selectedExam: string,
  examSubjects: (ExamSubject & { subject: Subject })[]
) => {
  const studentsInfo = await db.student.findMany({
    where: {
      sectionId: selectedSection,
    },
    orderBy: {
      firstName: "asc",
    },
  });
  const data = createheaderrow(examSubjects, studentsInfo);
  const date = new Date().toDateString();
  console.log("data => ", data);
  await writeXlsxFile(data, {
    filePath: `./public/excel/${date}.xlsx`,
  });
  redirect(`/excel/${date}.xlsx`);
};
