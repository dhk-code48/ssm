"use client";

import { Exam, ExamSubject, Grade, Subject } from "@prisma/client";
import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { Grip, Pencil } from "lucide-react";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import ExamSubjectForm from "./exam-subject-form";

interface ChaptersListProps {
  items: (ExamSubject & { subject: Subject })[];
  exam: Exam & { subjects: (ExamSubject & { subject: Subject })[] };
  grades: Grade[];
  subjects: Subject[];
  onReorder: (updateData: { id: string; position: number }[]) => void;
  onEdit: (id: string) => void;
}

export const ExamSubjectList = ({
  items,
  onReorder,
  exam,
  grades,
  subjects,
  onEdit,
}: ChaptersListProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [examsubjects, setChapters] = useState(items);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setChapters(items);
  }, [items]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(examsubjects);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const startIndex = Math.min(result.source.index, result.destination.index);
    const endIndex = Math.max(result.source.index, result.destination.index);

    const updatedChapters = items.slice(startIndex, endIndex + 1);

    setChapters(items);

    const bulkUpdateData = updatedChapters.map((chapter) => ({
      id: chapter.id,
      name: chapter.subject.name,
      position: items.findIndex((item) => item.id === chapter.id),
    }));

    console.log("BULK UPDATE - ", bulkUpdateData);
    onReorder(bulkUpdateData);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex gap-x-5 justify-start items-center text-left">
        <p className="w-[118px]">Subject</p>
        <p className="w-[218px]">Exam Date</p>
        <p className="w-[218px]">TH Full Marks</p>
        <p className="w-[218px]">TH Pass Marks</p>
        <p className="w-[218px]">Pr Full Marks</p>
        <p className="w-[218px]">Pr Pass Marks</p>
        <p>Action</p>
      </div>
      <Droppable droppableId="chapters">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {examsubjects.map((chapter, index) => (
              <Draggable key={chapter.id} draggableId={chapter.id} index={index}>
                {(provided) => (
                  <div
                    {...provided.draggableProps}
                    className="flex items-center gap-x-2 bg-slate-200 border-slate-200 border text-slate-700 rounded-md mb-4 text-sm"
                    ref={provided.innerRef}
                  >
                    <div
                      className={cn(
                        "px-2 py-3 border-r border-r-slate-200 hover:bg-slate-300 rounded-l-md transition"
                      )}
                      {...provided.dragHandleProps}
                    >
                      <Grip className="h-5 w-5" />
                    </div>
                    <ExamSubjectForm
                      examSubject={chapter}
                      subjects={subjects}
                      exam={exam}
                      grades={grades}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
