import { redirect } from "next/navigation";
import { LayoutDashboard } from "lucide-react";
import { db } from "@/lib/db";
import { IconBadge } from "@/components/icon-badge";
import { auth } from "@/auth";
import SubjectForm from "./_components/subject-form";
import BackButton from "@/components/back-button";

const CourseIdPage = async ({ params }: { params: { subjectId: string } }) => {
  const session = await auth();

  if (!session) {
    return redirect("/");
  }

  const subject = await db.subject.findUnique({
    where: {
      id: params.subjectId,
    },
  });

  return (
    <div className="space-y-10">
      <h1 className="text-2xl font-medium">Subject setup</h1>
      <span className="text-sm text-slate-700">Customize your subject and info&apos;s</span>

      <div>
        <SubjectForm subject={subject} />
      </div>
    </div>
  );
};

export default CourseIdPage;
