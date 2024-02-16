"use client";
import { createGradingSystem } from "@/actions/createGradingSystem";
import { updateGradingSystem } from "@/actions/updateGradingSystem";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { GradingSystemSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { GradingSystem } from "@prisma/client";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const GradeFrom = ({ gradingSystem }: { gradingSystem: GradingSystem | null }) => {
  const form = useForm<z.infer<typeof GradingSystemSchema>>({
    resolver: zodResolver(GradingSystemSchema),
    defaultValues: {
      name: (gradingSystem && gradingSystem.name) || "",
      percentageFrom: (gradingSystem && gradingSystem.percentageFrom) || 0,
      percentageTo: (gradingSystem && gradingSystem.percentageTo) || 100,
      point: (gradingSystem && gradingSystem.point) || 0,
      remarks: (gradingSystem && gradingSystem.remarks) || "",
    },
  });
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const onSubmit = (values: z.infer<typeof GradingSystemSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      gradingSystem &&
        updateGradingSystem(values, gradingSystem.id)
          .then((data) => {
            if (data?.error) {
              form.reset();
              setError(data.error);
            }

            if (data?.success) {
              form.reset();
              setSuccess(data.success);
              window.location.assign("/superadmin/gradingsystem/" + gradingSystem.id);
            }
          })
          .catch(() => setError("Something went wrong"));
      !gradingSystem &&
        createGradingSystem(values)
          .then((data) => {
            if (data?.error) {
              form.reset();
              setError(data.error);
            }

            if (data?.success) {
              form.reset();
              setSuccess(data.success);
              window.location.assign("/superadmin/gradingsystem/");
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
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isPending} placeholder="A , A+" type="text" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="percentageFrom"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Percentage From</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      onChange={(e) => form.setValue("percentageFrom", parseFloat(e.target.value))}
                      disabled={isPending}
                      placeholder="0"
                      type="number"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="percentageTo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Percentage To</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      onChange={(e) => form.setValue("percentageTo", parseFloat(e.target.value))}
                      disabled={isPending}
                      placeholder="100"
                      type="number"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="point"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Grade Point</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      onChange={(e) => form.setValue("point", parseFloat(e.target.value))}
                      disabled={isPending}
                      placeholder="4"
                      type="number"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="remarks"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Remarks</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isPending} placeholder="Outstanding" type="text" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button disabled={isPending} type="submit" className="w-full">
            {gradingSystem ? "Save Changes" : "Create Grading Scale"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default GradeFrom;
