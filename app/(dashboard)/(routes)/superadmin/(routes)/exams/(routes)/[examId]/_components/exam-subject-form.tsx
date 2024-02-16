"use client";
import * as z from "zod";

import { useForm } from "react-hook-form";
import React, { useEffect, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

import { zodResolver } from "@hookform/resolvers/zod";

import { ExamSubjectSchema } from "@/schemas";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { Exam, ExamSubject, Grade, Section, Student, Subject } from "@prisma/client";
import { createStudent } from "@/actions/createStudent";
import { updateStudent } from "@/actions/updateStudent";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createExamSubject } from "@/actions/createExamSubject";
import { updateExamSubject } from "@/actions/updateExamSubject";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  subjects: Subject[];
  exam: Exam & { subjects: (ExamSubject & { subject: Subject })[] };
  examSubject?: ExamSubject;
  grades: Grade[];
}

const ExamSubjectForm = ({
  className,
  exam,
  examSubject,
  grades,

  subjects,
  ...props
}: UserAuthFormProps) => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ExamSubjectSchema>>({
    resolver: zodResolver(ExamSubjectSchema),
    defaultValues: {
      subjectId: examSubject ? examSubject.subjectId : "",
      examId: examSubject ? examSubject.examId : exam.id,
      date: examSubject ? examSubject.date : new Date(),
      TfullMarks: examSubject ? examSubject.TfullMarks : "",
      TPassMarks: examSubject ? examSubject.TPassMarks : "",
      PfullMarks: examSubject ? examSubject.PfullMarks : "",
      PpassMarks: examSubject ? examSubject.PpassMarks : "",
      position: examSubject ? exam.subjects.length : 0,
    },
  });

  const onSubmit = (values: z.infer<typeof ExamSubjectSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      examSubject &&
        updateExamSubject(values, examSubject.id)
          .then((data) => {
            if (data?.error) {
              form.reset();
              setError(data.error);
            }
            if (data?.success) {
              form.reset();
              setSuccess(data.success);
              window.location.assign("/superadmin/exams/" + exam.id);
            }
          })
          .catch((error) => setError("Something went wrong " + error));
      !examSubject &&
        createExamSubject(values)
          .then((data) => {
            if (data?.error) {
              form.reset();
              setError(data.error);
            }
            if (data?.success) {
              form.reset();
              setSuccess(data.success);
              window.location.assign("/superadmin/exams/" + exam.id);
            }
          })
          .catch(() => setError("Something went wrong"))
          .finally(() => setSuccess(""));
    });
  };

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="w-full flex flex-wrap gap-x-3 gap-y-2 items-center justify-between">
            {!examSubject ? (
              <FormField
                control={form.control}
                name="subjectId"
                render={({ field }) => (
                  <FormItem>
                    {!examSubject && <FormLabel>Subject Name</FormLabel>}
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="min-w-[200px]">
                        <SelectValue placeholder="Subjects" />
                      </SelectTrigger>
                      <SelectContent>
                        {subjects.map((subject) => (
                          <SelectItem value={subject.id} key={"student-table " + subject.id}>
                            {subject.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : (
              <div className="h-full bg-white py-3 px-2 rounded w-[118px]">
                <p>{subjects.filter((subject) => subject.id === examSubject.subjectId)[0].name}</p>
              </div>
            )}

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  {!examSubject && <FormLabel>Exam Date</FormLabel>}
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !form.getValues("date") && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {form.getValues("date") ? (
                          format(form.getValues("date"), "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="TfullMarks"
              render={({ field }) => (
                <FormItem>
                  {!examSubject && <FormLabel>Theory Full Marks</FormLabel>}
                  <Input {...field} disabled={isPending} placeholder="75" />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="TPassMarks"
              render={({ field }) => (
                <FormItem>
                  {!examSubject && <FormLabel>Theory Pass Marks</FormLabel>}
                  <Input {...field} disabled={isPending} placeholder="27" />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="PfullMarks"
              render={({ field }) => (
                <FormItem>
                  {!examSubject && <FormLabel>Pratical Pass Marks</FormLabel>}
                  <Input {...field} disabled={isPending} placeholder="25" />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="PpassMarks"
              render={({ field }) => (
                <FormItem>
                  {!examSubject && <FormLabel>Pratical Pass Marks</FormLabel>}
                  <Input {...field} disabled={isPending} placeholder="10" />
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={isPending} type="submit" className="w-auto">
              {examSubject ? "Update" : "Add Subject"}
            </Button>
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
        </form>
      </Form>
    </div>
  );
};

export default ExamSubjectForm;
