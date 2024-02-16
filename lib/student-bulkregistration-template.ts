import writeXlsxFile from "write-excel-file";

export const HEADER_ROW = [
  {
    value: "registrationNumber",
    fontWeight: "bold",
  },
  {
    value: "firstName",
    fontWeight: "bold",
  },
  {
    value: "middleName",
    fontWeight: "bold",
  },
  {
    value: "lastName",
    fontWeight: "bold",
  },
  {
    value: "image",
    fontWeight: "bold",
  },
  {
    value: "regesteredAt",
    fontWeight: "bold",
  },
  {
    value: "dob",
    fontWeight: "bold",
  },
  {
    value: "mobileNumber",
    fontWeight: "bold",
  },
  {
    value: "country",
    fontWeight: "bold",
  },
  {
    value: "temporaryAddress",
    fontWeight: "bold",
  },
  {
    value: "permanentAddress",
    fontWeight: "bold",
  },
  {
    value: "batch",
    fontWeight: "bold",
  },
  {
    value: "email",
    fontWeight: "bold",
  },
  {
    value: "sectionId",
    fontWeight: "bold",
  },
  {
    value: "gradeId",
    fontWeight: "bold",
  },
];
export const SAMPLE_DATA = [
  {
    type: String,
    value: "79550",
  },
  {
    type: String,
    value: "Darshan",
  },
  {
    type: String,
    value: "",
  },
  {
    type: String,
    value: "Dhakal",
  },
  {
    type: String,
    value: "",
  },
  {
    type: Date,
    format: "yyyy/mm/dd",
    value: new Date(),
  },
  {
    type: Date,
    format: "yyyy/mm/dd",
    value: new Date(),
  },
  {
    type: String,
    value: "9704484069",
  },
  {
    type: String,
    value: "Nepal",
  },
  {
    type: String,
    value: "Pokhara",
  },
  {
    type: String,
    value: "Kotre",
  },
  {
    type: String,
    value: "20280",
  },
  {
    type: String,
    value: "dhk.darshan48@gmail.com",
  },
  {
    type: String,
    value: "Section Id",
  },
  {
    type: String,
    value: "Grade Id",
  },
];
const data = [HEADER_ROW, SAMPLE_DATA];
export const handleTemplateDownload = async () => {
  await writeXlsxFile(data, {
    fileName: "/file.xlsx",
  }).then((value) => console.log(value));
};
