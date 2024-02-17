"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useEffect, useState } from "react";
import readXlsxFile from "read-excel-file";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Student } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import { downloadFile } from "@/lib/downloadResultSampleExcel";
const SuperAdminStudentBulkRegistration = () => {
  const [excelfile, setExcelFile] = useState<File | null>(null);
  const [bulkData, setBulkData] = useState<Student[]>([]);

  useEffect(() => {
    if (excelfile) {
      readXlsxFile(excelfile).then((rows) => {
        console.log("ROWS => ", rows);
        rows.forEach((row, i) => {
          i !== 0 &&
            setBulkData((prev) => [
              ...prev,
              {
                id: uuidv4(),
                registrationNumber: row[0]?.toString(),
                firstName: row[1]?.toString(),
                middleName: row[2]?.toString(),
                lastName: row[3]?.toString(),
                image: row[4]?.toString(),
                regesteredAt: new Date(row[5]?.toString()),
                dob: new Date(row[6]?.toString()),
                mobileNumber: row[7]?.toString(),
                country: row[8]?.toString(),
                temporaryAddress: row[9]?.toString(),
                permanentAddress: row[10]?.toString(),
                batch: row[11]?.toString(),
                email: row[12]?.toString(),
                sectionId: row[14]?.toString(),
                gradeId: row[13]?.toString(),
                batchId: "",
                createdAt: new Date(),
                updatedAt: new Date(),
              },
            ]);
        });
      });
    }
  }, [excelfile]);
  return (
    <div className="space-y-10">
      <div className="flex justify-between items-center">
        <div className="prose">
          <h2 className="mb-0">Bulk Registration of Students</h2>
          <p className="text-sm">Register huge amount of students at once</p>
        </div>
        <Button onClick={() => downloadFile()}>Download CSV Template</Button>
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="excelfile">Import Excel File</Label>
        <Input
          className="lg:w-[300px]"
          id="excelfile"
          type="file"
          placeholder="Import Excel File"
          onChange={(e) => setExcelFile(e.target.files && e.target.files[0])}
        />
      </div>

      <Table>
        <TableCaption>A Perview of students to upload.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Registration Number</TableHead>
            <TableHead>First Name</TableHead>
            <TableHead>Middle Name</TableHead>
            <TableHead>Last Name</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Regestered At</TableHead>
            <TableHead>DOB</TableHead>
            <TableHead>Mobile Number</TableHead>
            <TableHead>Country</TableHead>
            <TableHead>Temporary Address</TableHead>
            <TableHead>Permanent Address</TableHead>
            <TableHead>Batch</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Section Id</TableHead>
            <TableHead>Grade Id</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bulkData &&
            bulkData.map((student) => (
              <TableRow key={"bulkdata-registration " + student.id}>
                <TableCell>{student.registrationNumber}</TableCell>
                <TableCell>{student.firstName}</TableCell>
                <TableCell>{student.middleName}</TableCell>
                <TableCell>{student.lastName}</TableCell>
                <TableCell>{student.image}</TableCell>
                <TableCell>{new Date(student.regesteredAt.toString()).toDateString()}</TableCell>
                <TableCell>{new Date(student.regesteredAt.toString()).toDateString()}</TableCell>
                <TableCell>{student.mobileNumber}</TableCell>
                <TableCell>{student.country}</TableCell>
                <TableCell>{student.temporaryAddress}</TableCell>
                <TableCell>{student.permanentAddress}</TableCell>
                <TableCell>{student.batchId}</TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell>{student.sectionId}</TableCell>
                <TableCell>{student.gradeId}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      {bulkData && <Button>Insert Student&apos;s Info</Button>}
    </div>
  );
};

export default SuperAdminStudentBulkRegistration;
