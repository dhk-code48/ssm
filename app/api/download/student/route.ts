import { NextRequest, NextResponse } from "next/server";
const writeXlsxFile = require("write-excel-file/node");

const HEADER_ROW = [
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

const data = [HEADER_ROW, DATA_ROW_1];

export async function GET(request: NextRequest) {
  console.log("THIS IS CORRECT");
  try {
    // Write the Excel file to memory
    const buffer = await writeXlsxFile(data, { buffer: true });

    // Send the file to the client
    return NextResponse.json(buffer, {
      headers: {
        "Content-Disposition": 'attachment; filename="file.xlsx"',
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
    });
  } catch (error) {
    console.error("Error generating Excel file:", error);
    return NextResponse.json("Internal Server Error");
  }
}
