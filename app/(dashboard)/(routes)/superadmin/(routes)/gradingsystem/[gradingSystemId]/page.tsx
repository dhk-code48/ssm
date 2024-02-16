import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { auth } from "@/auth";
import GradeFrom from "./_components/grading-system-form";

const CourseIdPage = async ({ params }: { params: { gradingSystemId: string } }) => {
  const session = await auth();

  if (!session) {
    return redirect("/");
  }

  const gradingSystem = await db.gradingSystem.findUnique({
    where: {
      id: params.gradingSystemId,
    },
  });

  return (
    <div className="space-y-10">
      <h1 className="text-2xl font-medium">Grading Scale setup</h1>
      <span className="text-sm text-slate-700">Customize your grading scale</span>
      <div>
        <GradeFrom gradingSystem={gradingSystem} />
      </div>
    </div>
  );
};

export default CourseIdPage;
