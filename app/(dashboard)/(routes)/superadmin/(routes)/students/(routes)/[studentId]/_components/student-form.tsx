"use client";
import * as z from "zod";

import { useForm } from "react-hook-form";
import React, { useEffect, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

import { zodResolver } from "@hookform/resolvers/zod";

import { StudentSchema } from "@/schemas";
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
import { Grade, Section, Student } from "@prisma/client";
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
import Link from "next/link";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  grades: (Grade & { sections: Section[] })[];
  studentId: string;
  student: Student | null;
}

const TeacherForm = ({ className, grades, student, studentId, ...props }: UserAuthFormProps) => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof StudentSchema>>({
    resolver: zodResolver(StudentSchema),
    defaultValues: {
      registrationNumber: student ? student.registrationNumber : "",
      firstName: student ? student.firstName : "",
      middleName: student ? (student.middleName ? student.middleName : "") : "",
      lastName: student ? student.lastName : "",
      image: student ? (student.image ? student.image : "") : "",
      regesteredAt: student ? student.regesteredAt : new Date(),
      dob: student ? student.dob : new Date(),
      mobileNumber: student ? student.mobileNumber : "",
      country: student ? student.country : "",
      temporaryAddress: student ? student.temporaryAddress : "",
      permanentAddress: student ? student.permanentAddress : "",
      batch: student ? student.batch : "",
      email: student ? student.email : "",
      sectionId: student ? student.sectionId : "",
      gradeId: student ? student.gradeId : "",
    },
  });

  const onSubmit = (values: z.infer<typeof StudentSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      student &&
        updateStudent(values, studentId)
          .then((data) => {
            if (data?.error) {
              form.reset();
              setError(data.error);
            }
            if (data?.success) {
              form.reset();
              setSuccess(data.success);
              window.location.assign("/superadmin/students");
            }
          })
          .catch(() => setError("Something went wrong"));

      !student &&
        createStudent(values)
          .then((data) => {
            if (data?.error) {
              form.reset();
              setError(data.error);
            }
            if (data?.success) {
              form.reset();
              setSuccess(data.success);
              window.location.assign("/superadmin/students");
            }
          })
          .catch(() => setError("Something went wrong"));
    });
  };

  return (
    <div className={cn("grid gap-6 ", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="registrationNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Registration Number</FormLabel>
                  <Input {...field} disabled={isPending} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <Input {...field} disabled={isPending} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="middleName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Middle Name</FormLabel>
                  <Input {...field} disabled={isPending} />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <Input {...field} disabled={isPending} />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <Input {...field} disabled={isPending} />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="regesteredAt"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Registered At</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !form.getValues("regesteredAt") && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {form.getValues("regesteredAt") ? (
                          format(form.getValues("regesteredAt"), "PPP")
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
                        disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
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
              name="dob"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>DOB</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !form.getValues("dob") && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {form.getValues("dob") ? (
                          format(form.getValues("dob"), "PPP")
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
                        disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
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
              name="mobileNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mobile Number</FormLabel>
                  <Input {...field} disabled={isPending} />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <Input {...field} disabled={isPending} />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="temporaryAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Temporary Address</FormLabel>
                  <Input {...field} disabled={isPending} />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="permanentAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Permanent Address</FormLabel>
                  <Input {...field} disabled={isPending} />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="batch"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Batch</FormLabel>
                  <Input {...field} disabled={isPending} />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <Input type="email" {...field} disabled={isPending} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gradeId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Grade</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a verified email to display" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {grades.map((grade) => (
                        <SelectItem key={"student-form " + grade.id} value={grade.id}>
                          {grade.name}
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
              name="sectionId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Section</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a verified email to display" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {form.getValues("gradeId") &&
                        grades
                          .filter((grade) => grade.id === form.getValues("gradeId"))[0]
                          .sections.map((section) => (
                            <SelectItem key={"student-form " + section.id} value={section.id}>
                              {section.name}
                            </SelectItem>
                          ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button disabled={isPending} type="submit" className="w-full">
            {student ? "Update Student Info" : "Add Student"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default TeacherForm;
