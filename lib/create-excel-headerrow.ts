import { ExamSubject, Student, Subject } from "@prisma/client";

export const createheaderrow = (
  examsubjects: (ExamSubject & { subject: Subject })[],
  studentsInfo: Student[]
) => {
  const header_data = examsubjects.map((examsubj) => [
    {
      value: examsubj.subject.name + "(TH)",
      fontWeight: "bold",
    },
    ,
    {
      value: examsubj.subject.name + "(PR)",
      fontWeight: "bold",
    },
  ]);
  const row_data = [
    ...studentsInfo.map((student) => [
      {
        type: String,
        value: student.registrationNumber,
      },
      {
        type: String,
        value:
          student.firstName +
          (student.middleName && " " + student.middleName) +
          " " +
          student.lastName,
      },
      ...examsubjects.map(() => ({
        type: Number,
        value: 0,
      })),
      ...examsubjects.map(() => ({
        type: Number,
        value: 0,
      })),
    ]),
  ];
  const header_row = [
    {
      value: "Reg. No.",
      fontWeight: "bold",
    },
    {
      value: "Name",
      fontWeight: "bold",
    },
    ...examsubjects.flatMap((examsubject) => [
      {
        value: "(TH)" + examsubject.subject.name,
        fontWeight: "bold",
      },
      {
        value: "(PR)" + examsubject.subject.name,
        fontWeight: "bold",
      },
    ]),
  ];
  return [header_row, ...row_data];
};
