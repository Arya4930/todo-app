import { X, Grip } from "lucide-react";
import Draggable from "../Draggable/Draggable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function Card({ task, onDelete, type }) {
    const typeColors = {
        todo: "",
        inProgress: "bg-yellow-500",
        done: "bg-green-500",
    };

    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id: task.id,
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            key={task.id}
        >
            <div
                className={`flex items-center mr-2 mb-2 w-full border border-w-1 rounded-lg ${typeColors[type]}`}>
                <div className="p-4 rounded-lg text-white flex items-center hover:cursor-move w-full">
                    <Grip className="inline-block mr-2 text-gray-500" />
                    <span className="text-white">{task.text}</span>
                </div>
                <div className="flex justify-center m-2 ">
                    <button onClick={() => onDelete(task.id, type)} onPointerDown={(e) => e.stopPropagation()} className="p-4 rounded-lg text-black flex items-center hover:cursor-pointer" >
                        <X className="w-4 h-4 m-2 text-red-500" />
                    </button>
                </div>
            </div>
        </div>
    );
};