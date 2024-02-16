import { ExamSubject, Result, Subject } from "@prisma/client";
import React, { FC } from "react";
import { Row } from "read-excel-file";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const SuperAdminResultTable: FC<{
  gradeId: string;
  results: Result[];
  examId: string;
  data: Row[];
  examSubjects: (ExamSubject & { subject: Subject })[];
}> = ({ examId, data, gradeId, examSubjects, results }) => {
  return (
    <div className=" overflow-scroll">
      <Table>
        <TableCaption>Preview Results</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Reg No.</TableHead>
            <TableHead>Name</TableHead>
            {examSubjects.map((examsubject) => (
              <>
                <TableHead>{examsubject.subject.name}(TH)</TableHead>
                <TableHead>{examsubject.subject.name}(PR)</TableHead>
              </>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">INV001</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
          </TableRow>
        </TableBody>
      </Table>

      {examSubjects.map((examsubject) => (
        <p>{examsubject.PfullMarks}</p>
      ))}
    </div>
  );
};

export default SuperAdminResultTable;
