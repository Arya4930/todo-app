"use client"

import { useState, useEffect } from "react"
import { Plus } from "lucide-react";
import { v4 as uuidv4 } from 'uuid';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    MouseSensor,
    TouchSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import Column from "./Draggable/Column";
import { DragOverlay } from "@dnd-kit/core";
import Card from "./Draggable/Card";

export default function MainContent() {
    const [tasks, setTasks] = useState({ todo: [], inProgress: [], done: [] });
    const [newTask, setNewTask] = useState('');
    const [activeId, setActiveId] = useState(null);

    useEffect(() => {
        const savedTasks = localStorage.getItem("tasks");
        if (savedTasks) {
            setTasks(JSON.parse(savedTasks));
        }
    }, [])

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks])

    const addNewTask = () => {
        if (!newTask.trim()) return;
        const task = {
            id: uuidv4(),
            text: newTask,
        }
        setTasks(prevTasks => ({
            ...prevTasks,
            todo: [...prevTasks.todo, task]
        }));
        setNewTask('');
    }

    const deleteTask = (id, category) => {
        setTasks(prevTasks => ({
            ...prevTasks,
            [category]: prevTasks[category].filter(task => task.id !== id)
        }));
    }

    const handleEdit = (id, category, newText) => {
        setTasks(prev => ({
            ...prev,
            [category]: prev[category].map(task =>
                task.id === id ? { ...task, text: newText } : task
            )
        }));
    };

    const handleDragStart = ({ active }) => {
        setActiveId(active.id);
    };

    const handleDragEnd = ({ active, over }) => {
        if (!over) return;
        setActiveId(null);

        const sourceCat = Object.keys(tasks).find(key => tasks[key].some(task => task.id === active.id));
        let destinationCat = Object.keys(tasks).find(key => tasks[key].some(task => task.id === over.id));

        if (!destinationCat && Object.keys(tasks).includes(over.id)) {
            destinationCat = over.id;
        }

        if (!sourceCat || !destinationCat) return;

        if (sourceCat === destinationCat) {
            const sourceTasks = [...tasks[sourceCat]];
            const oldIdx = sourceTasks.findIndex(task => task.id === active.id);
            const newIdx = over.id === destinationCat ? sourceTasks.length : sourceTasks.findIndex(task => task.id === over.id);

            if (oldIdx !== newIdx && newIdx !== -1) {
                setTasks(prev => ({
                    ...prev,
                    [sourceCat]: arrayMove(prev[sourceCat], oldIdx, newIdx),
                }));
            }
        } else {
            const task = tasks[sourceCat].find(task => task.id === active.id);
            const destinationTasks = [...tasks[destinationCat]];
            const newIdx = over.id === destinationCat ? destinationTasks.length : destinationTasks.findIndex(task => task.id === over.id);

            setTasks(prev => ({
                ...prev,
                [sourceCat]: prev[sourceCat].filter(task => task.id !== active.id),
                [destinationCat]: newIdx === -1 ? [...prev[destinationCat], task] : [
                    ...prev[destinationCat].slice(0, newIdx),
                    task,
                    ...prev[destinationCat].slice(newIdx)
                ]
            }));
        }
    };

    const sensors = useSensors(
        useSensor(MouseSensor, {
            activationConstraint: {
                distance: 10,
            },
        }),
        useSensor(TouchSensor, {
            activationConstraint: {
                delay: 250,
                tolerance: 5,
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const activeTask =
        Object.values(tasks).flat().find(task => task.id === activeId) || null;

    return (
        <div className="mb-40 mx-4">
            <div className="flex space-x-4">
                <input
                    type="text"
                    value={newTask}
                    onChange={e => setNewTask(e.target.value)}
                    placeholder="Add new Task"
                    className="flex-1 p-4 rounded-lg m-4 border border-gray-2"
                />
                <button
                    onClick={addNewTask}
                    className="bg-green-500 hover:bg-green-600 text-white px-6 py-4 rounded-lg m-4 hover:cursor-pointer flex items-center"
                >
                    <Plus className="mr-2" />
                    Add Task
                </button>
            </div>
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
                <div className="grid grid-rows-3 lg:grid-cols-3 gap-4">
                    {["todo", "inProgress", "done"].map((type) => (
                        <SortableContext key={type} items={tasks[type].map((task) => task.id)} strategy={verticalListSortingStrategy}>
                            <Column tasks={tasks} type={type} onDelete={deleteTask} activeId={activeId} handleEdit={handleEdit} />
                        </SortableContext>
                    ))}
                </div>
                <DragOverlay>
                    {activeTask ? (
                        <Card task={activeTask} onDelete={deleteTask} type="" />
                    ) : null}
                </DragOverlay>
            </DndContext>
        </div>
    )
}