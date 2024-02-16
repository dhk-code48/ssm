import * as z from "zod";

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Minimum of 6 characters required",
  }),
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
  code: z.optional(z.string()),
});

export const GradeSchema = z.object({
  name: z.string().min(1),
});
export const BatchSchema = z.object({
  name: z.string().min(1),
  isActive: z.boolean(),
});
export const GradingSystemSchema = z.object({
  name: z.string().min(1, {
    message: "Grade Point Name is required",
  }),

  percentageFrom: z
    .number()
    .min(0.0, {
      message: "Minimum Value Of Percentage is 0 is required",
    })
    .max(100.0, {
      message: "Minimum Value Of Percentage is 100 is required",
    }),
  percentageTo: z
    .number()
    .min(0.0, {
      message: "Minimum Value Of Percentage is 0 is required",
    })
    .max(100.0, {
      message: "Minimum Value Of Percentage is 100 is required",
    }),
  point: z
    .number()
    .min(0.0, {
      message: "Minimum Value Of Percentage is 0 is required",
    })
    .max(4.0, {
      message: "Minimum Value Of Percentage is 4 is required",
    }),
  remarks: z.string().min(1, {
    message: "Remarks is required",
  }),
});

export const SubjectSchema = z.object({
  name: z.string().min(1, {
    message: "Subject Name is required",
  }),
  optional: z.boolean(),
  subjectCode: z.string().min(1, {
    message: "Subject Code is required.",
  }),
});
export const ChapterSchema = z.object({
  name: z.string().min(1),
  sectionId: z.string().min(1),
});
export const SectionSchema = z.object({
  name: z.string().min(1),
  gradeId: z.string().min(1),
});

export const WorksheetSchema = z.object({
  name: z.string().min(5, {
    message: "Name must be at least 5 characters.",
  }),
  published: z.boolean(),
});

export const TeacherSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
  name: z.string().min(1, {
    message: "Name is required",
  }),
  sections: z.array(z.string().min(1)).min(1, {
    message: "Minimun of 1 section required",
  }),
});
export const ExamSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  gradeId: z.string().min(1, {
    message: "Name is required",
  }),
  batchId: z.string().min(1, {
    message: "Name is required",
  }),
  startingDate: z.date({
    required_error: "Exam Starting Date required !",
  }),
  endingDate: z.date({
    required_error: "Exam Ending Date required !",
  }),
});
export const ExamSubjectSchema = z.object({
  subjectId: z.string().min(1, {
    message: "SubjectName is required",
  }),
  examId: z.string().min(1, {
    message: "Exam Name is required",
  }),
  date: z.date({
    required_error: "Exam Starting Date required !",
  }),
  TfullMarks: z.string().min(1, {
    message: "Theory Full Marks is required",
  }),
  TPassMarks: z.string().min(1, {
    message: "Theory Pass Marks is required",
  }),
  PfullMarks: z.string().min(1, {
    message: "Practical Full Marks is required",
  }),
  PpassMarks: z.string().min(1, {
    message: "Practical Pass Marks is required",
  }),
  position: z.number(),
});

export const StudentSchema = z.object({
  batchId: z.string().min(1, {
    message: "Registration Number is Required",
  }),
  registrationNumber: z.string().min(1, {
    message: "Registration Number is Required",
  }),

  firstName: z.string().min(1, {
    message: "First Name is required",
  }),
  middleName: z.string().optional(),
  lastName: z.string().min(1, {
    message: "Last Name is required",
  }),
  image: z.string().optional(),
  regesteredAt: z.date({
    required_error: "Regestered date is required",
  }),
  dob: z.date({
    required_error: "Date Of Birth is required",
  }),
  mobileNumber: z.string().min(1, {
    message: "Mobile Number is required",
  }),
  country: z.string().min(1, {
    message: "country is required",
  }),
  temporaryAddress: z.string().min(1, {
    message: "temporaryAddres is required",
  }),
  permanentAddress: z.string().min(1, {
    message: "Permanent Addres is required",
  }),

  email: z.string().email({
    message: "Email is required",
  }),

  sectionId: z.string().min(1, {
    message: "SectionId is required",
  }),

  gradeId: z.string().min(1, {
    message: "gradeId is required",
  }),
});
