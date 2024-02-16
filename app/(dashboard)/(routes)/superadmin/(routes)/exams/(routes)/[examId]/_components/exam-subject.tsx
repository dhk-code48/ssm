"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2, PlusCircle } from "lucide-react";
import { startTransition, useState } from "react";
import { useRouter } from "next/navigation";
import { ExamSubject, Exam, Subject, Grade } from "@prisma/client";

import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

import { ExamSubjectList } from "./exam-subjects-list";
import ExamSubjectForm from "./exam-subject-form";
import { reorderExamSubject } from "@/actions/reorderExamSubject";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";

interface ChaptersFormProps {
  examData: Exam & { subjects: (ExamSubject & { subject: Subject })[] };
  grades: Grade[];
  subjects: Subject[];
}

export const SuperAdminExamSubject = ({ examData, grades, subjects }: ChaptersFormProps) => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const toggleCreating = () => {
    setIsCreating((current) => !current);
  };

  const router = useRouter();

  const onReorder = async (updateData: { id: string; position: number }[]) => {
    setIsUpdating(true);
    setError("");
    setSuccess("");
    startTransition(() => {
      reorderExamSubject(updateData)
        .then((data) => {
          if (data?.error) {
            setError(data.error);
          }
          if (data?.success) {
            setSuccess(data.success);
            router.refresh();
            setIsUpdating(false);
          }
        })
        .catch(() => setError("Something went wrong"));
    });
  };

  const onEdit = (id: string) => {
    // router.push(`/teacher/courses/${courseId}/chapters/${id}`);
  };

  return (
    <div className="relative mt-6 border bg-slate-100 rounded-md p-4">
      {isUpdating && (
        <div className="absolute h-full w-full bg-slate-500/20 top-0 right-0 rounded-m flex items-center justify-center">
          <Loader2 className="animate-spin h-6 w-6 text-sky-700" />
        </div>
      )}
      <div className="font-medium flex items-center justify-between">
        Schedule Your Exam
        <Button onClick={toggleCreating} variant="ghost">
          {isCreating ? (
            <>Cancel</>
          ) : (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add a subject
            </>
          )}
        </Button>
      </div>
      {isCreating && <ExamSubjectForm subjects={subjects} exam={examData} grades={grades} />}
      {!isCreating && (
        <div className={"text-sm mt-2"}>
          {!examData.subjects.length && "No chapters"}
          <ExamSubjectList
            subjects={subjects}
            exam={examData}
            grades={grades}
            onEdit={onEdit}
            onReorder={onReorder}
            items={examData.subjects || []}
          />
        </div>
      )}
      <FormError message={error} />
      <FormSuccess message={success} />
      {!isCreating && (
        <p className="text-xs text-muted-foreground mt-4">
          Drag and drop to reorder the subjects (exam)
        </p>
      )}
    </div>
  );
};
