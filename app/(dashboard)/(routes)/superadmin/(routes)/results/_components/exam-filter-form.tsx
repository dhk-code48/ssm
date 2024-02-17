"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Exam, ExamSubject, Grade, Result, Section, Subject } from "@prisma/client";
import { Label } from "@radix-ui/react-label";
import { Download, Filter, Upload } from "lucide-react";
import React, { FC, useEffect, useState } from "react";
import readXlsxFile, { Row } from "read-excel-file";
import SuperAdminResultTable from "./result-table";
import { downloadFile } from "@/lib/downloadResultSampleExcel";

const ExamFilterForm: FC<{
  grades: (Grade & {
    sections: Section[];
    exams: (Exam & { results: Result[]; subjects: (ExamSubject & { subject: Subject })[] })[];
  })[];
}> = ({ grades }) => {
  const [excelfile, setExcelFile] = useState<File | null>(null);
  const [selectedGrade, setSelectedGrade] = useState<string>("");
  const [selectedExam, setSelectedExam] = useState<string>("");
  const [selectedSection, setSelectedSection] = useState<string>("");

  const [bulkData, setBulkData] = useState<Row[]>([]);

  useEffect(() => {
    if (excelfile) {
      readXlsxFile(excelfile).then((rows) => {
        setBulkData(rows);
      });
    }
  }, [excelfile]);
  return (
    <div className="px-10 space-y-5 py-5 rounded-lg bg-slate-100">
      <div className="flex items-center gap-x-5">
        <h4 className="font-semibold mb-0">Filter Results</h4>
        <Filter size={18} />
      </div>
      <div className="flex flex-wrap gap-y-5 gap-x-10">
        <Select onValueChange={(value) => setSelectedGrade(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a grade" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Grades</SelectLabel>
              {grades.map((grade) => (
                <SelectItem value={grade.id} key={"exam-filter-form " + grade.id}>
                  Grade : {grade.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select onValueChange={(value) => setSelectedExam(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a Exam" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Exams/Term</SelectLabel>
              {grades
                .filter((grade) => grade.id === selectedGrade)[0]
                ?.exams.map((exam) => (
                  <SelectItem value={exam.id} key={"exam-filter-form " + exam.id}>
                    {exam.name}
                  </SelectItem>
                ))}
            </SelectGroup>
          </SelectContent>
        </Select>{" "}
        <Select onValueChange={(value) => setSelectedSection(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a Section" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Sections</SelectLabel>
              {grades
                .filter((grade) => grade.id === selectedGrade)[0]
                ?.sections.map((section) => (
                  <SelectItem value={section.id} key={"exam-filter-form " + section.id}>
                    {section.name}
                  </SelectItem>
                ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        {selectedExam !== "" && selectedGrade !== "" && selectedSection !== "" && (
          <>
            <Button
              className="gap-x-3"
              onClick={() =>
                downloadFile(
                  selectedGrade,
                  selectedSection,
                  selectedExam,
                  grades
                    .filter((grade) => grade.id === selectedGrade)[0]
                    .exams.filter((exam) => exam.id === selectedExam)[0].subjects
                )
              }
            >
              <Download size={16} />
              Download Excel Sample
            </Button>
            <div className="md:flex w-full max-w-sm items-center gap-1.5">
              <Button variant="ghost">Select Excel File</Button>
              <Input
                id="picture"
                type="file"
                placeholder="Import Excel File"
                onChange={(e) => setExcelFile(e.target.files && e.target.files[0])}
              />
            </div>
          </>
        )}
      </div>
      {selectedExam !== "" && selectedGrade !== "" && selectedSection !== "" && (
        <SuperAdminResultTable
          examId={selectedExam}
          results={
            grades
              .filter((grade) => grade.id === selectedGrade)[0]
              .exams.filter((exam) => exam.id === selectedExam)[0].results
          }
          gradeId={selectedGrade}
          examSubjects={
            grades
              .filter((grade) => grade.id === selectedGrade)[0]
              .exams.filter((exam) => exam.id === selectedExam)[0].subjects
          }
          data={bulkData}
        />
      )}
    </div>
  );
};

export default ExamFilterForm;
