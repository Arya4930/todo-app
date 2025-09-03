import { X, Grip, PencilIcon, Check } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState, useRef, useEffect } from "react";

export default function Card({ task, onDelete, type, handleEdit }) {
    const inputRef = useRef(null);
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

    const [isEditing, setisEditing] = new useState(false);
    const [editVal, setEditVal] = new useState(task.text);

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
            inputRef.current.select();
        }
    }, [isEditing]);

    const handleSave = () => {
        if (!editVal.trim()) return;
        handleEdit(task.id, type, editVal);
        setisEditing(false);
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
                className={`flex items-center mr-2 mb-2 w-full border border-w-1 rounded-lg ${typeColors[type]} duration-300`}>
                <div className="p-4 rounded-lg flex items-center hover:cursor-move w-full">
                    <Grip className="inline-block mr-2 text-gray-500" />
                    {isEditing ? (
                        <input
                            type="text"
                            value={editVal}
                            onChange={(e) => setEditVal(e.target.value)}
                            onBlur={handleSave}
                            className="flex-1 p-2 rounded-lg"
                            ref={inputRef}
                        />
                    ) : (
                        <span>{task.text}</span>
                    )}
                </div>
                <div className="flex justify-center m-2 ">
                    {isEditing ? (
                        <button onClick={() => handleSave(task.id, type)} onPointerDown={(e) => e.stopPropagation()} className="m-2 p-4 rounded-lg text-black flex items-center hover:cursor-pointer border border-red-500">
                            <Check className="w-5 h-5 text-green-500" />
                        </button>
                    ) : (
                        <button onClick={() => setisEditing(true)} onPointerDown={(e) => e.stopPropagation()} className="m-2 p-4 rounded-lg text-black flex items-center hover:cursor-pointer border border-green-500">
                            <PencilIcon className="w-5 h-5 text-red-500" />
                        </button>
                    )}
                    <button
                        onClick={() => {
                            if (isEditing) {
                                setisEditing(false);
                            } else {
                                onDelete(task.id, type);
                            }
                        }}
                        onPointerDown={(e) => e.stopPropagation()}
                        className="m-2 p-4 rounded-lg text-black flex items-center hover:cursor-pointer border border-red-500"
                    >
                        <X className="w-6 h-6 text-red-500" />
                    </button>

                </div>
            </div>
        </div>
    );
};