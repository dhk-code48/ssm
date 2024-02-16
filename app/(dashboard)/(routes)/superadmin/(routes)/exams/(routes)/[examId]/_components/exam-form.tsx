"use client";
import * as z from "zod";

import { useForm } from "react-hook-form";
import React, { useEffect, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

import { zodResolver } from "@hookform/resolvers/zod";

import { ExamSchema } from "@/schemas";
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
import { Exam, Grade, Section, Student } from "@prisma/client";
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
import { updateExam } from "@/actions/updateExam";
import { createExam } from "@/actions/createExam";
import { useBatchStore } from "@/lib/batch-store";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  studentId: string;
  exam: Exam | null;
  grades: Grade[];
}

const TeacherForm = ({ className, exam, grades, studentId, ...props }: UserAuthFormProps) => {
  const [error, setError] = useState<string | undefined>("");
  const batchId = useBatchStore((state) => state.batchId);
  const [success, setSuccess] = useState<string | undefined>("");

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ExamSchema>>({
    resolver: zodResolver(ExamSchema),
    defaultValues: {
      name: exam ? exam.name : "",
      gradeId: exam ? exam.gradeId : "",
      batchId: exam ? exam.batchId : batchId,
      startingDate: exam ? exam.startingDate : new Date(),
      endingDate: exam ? exam.endingDate : new Date(),
    },
  });

  const onSubmit = (values: z.infer<typeof ExamSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      exam &&
        updateExam(values, exam.id)
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
          .catch(() => setError("Something went wrong"));

      !exam &&
        createExam(values)
          .then((data) => {
            if (data?.error) {
              form.reset();
              setError(data.error);
            }
            if (data?.success) {
              form.reset();
              setSuccess(data.success);
              window.location.assign("/superadmin/exams/");
            }
          })
          .catch(() => setError("Something went wrong"));
    });
  };

  return (
    <div className={cn("grid gap-6 ", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-2 gap-x-20 gap-y-10 w-max items-center justify-center">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Examination Term/Title/Name</FormLabel>
                  <Input {...field} disabled={isPending} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gradeId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Choose Grade</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a grade" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {grades.map((grade) => (
                        <SelectItem value={grade.id} key={"exam-form " + grade.id}>
                          Grade : {grade.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="startingDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Starting Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !form.getValues("startingDate") && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {form.getValues("startingDate") ? (
                          format(form.getValues("startingDate"), "PPP")
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
              name="endingDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Ending Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !form.getValues("endingDate") && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {form.getValues("endingDate") ? (
                          format(form.getValues("endingDate"), "PPP")
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
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button disabled={isPending} type="submit" className="w-full">
            {exam ? "Update Exam Info" : "Create  Exam"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default TeacherForm;
