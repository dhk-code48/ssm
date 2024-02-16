"use client";
import { createGrade } from "@/actions/createGrade";
import { createSubject } from "@/actions/createSubject";
import { updateGrade } from "@/actions/updateGrade";
import { updateSubject } from "@/actions/updateSubject";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SubjectSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Grade, Subject } from "@prisma/client";
import { redirect } from "next/navigation";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const GradeFrom = ({ subject }: { subject: Subject | null }) => {
  const form = useForm<z.infer<typeof SubjectSchema>>({
    resolver: zodResolver(SubjectSchema),
    defaultValues: {
      name: (subject && subject.name) || "",
      subjectCode: (subject && subject.subjectCode) || "",
      optional: (subject && subject.optional) || false,
    },
  });
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const onSubmit = (values: z.infer<typeof SubjectSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      subject &&
        subject.id &&
        updateSubject(values, subject.id)
          .then((data) => {
            if (data?.error) {
              form.reset();
              setError(data.error);
            }

            if (data?.success) {
              form.reset();
              setSuccess(data.success);
              window.location.assign("/superadmin/subjects/" + subject.id);
            }
          })
          .catch(() => setError("Something went wrong"));
      !subject &&
        createSubject(values)
          .then((data) => {
            if (data?.error) {
              form.reset();
              setError(data.error);
            }

            if (data?.success) {
              form.reset();
              setSuccess(data.success);
              window.location.assign("/superadmin/subjects/");
            }
          })
          .catch(() => setError("Something went wrong"));
    });
  };

  return (
    <div className="space-y-6 inline-block">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject Name</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isPending} placeholder="Compuer" type="text" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="subjectCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>subjectCode</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isPending} placeholder="1221" type="text" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />{" "}
            <FormField
              control={form.control}
              name="optional"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Is Subject Optional ? </FormLabel>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button disabled={isPending} type="submit">
            {subject ? "Save Changes" : "Create Subject"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default GradeFrom;
