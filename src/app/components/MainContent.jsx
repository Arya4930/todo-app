"use client"

import { useState, useEffect } from "react"
import { Plus} from "lucide-react";
import { v4 as uuidv4 } from 'uuid';
import { DndContext } from "@dnd-kit/core";
import Column from "./Stuff/Column";

export default function MainContent() {
    const [tasks, setTasks] = useState({ todo: [], inProgress: [], done: [] });
    const [newTask, setNewTask] = useState('');

    useEffect(() => {
        const savedTasks = localStorage.getItem("todo");
        if (savedTasks) {
            setTasks(JSON.parse(savedTasks));
            console.log(JSON.parse(savedTasks))
        }
    }, [])

    useEffect(() => {
        localStorage.setItem("todo", JSON.stringify(tasks));
    }, [tasks])

    const addNewTask = () => {
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

    const handleDragEnd = ({ active, over }) => {
        if (!over) return;

        const sourceCat = Object.keys(tasks).find(key => tasks[key].some(task => task.id === active.id));
        const destination = over.id;
        if (sourceCat !== destination) {
            const task = tasks[sourceCat].find(task => task.id === active.id);
            setTasks(prev => ({
                ...prev,
                [sourceCat]: prev[sourceCat].filter(task => task.id !== active.id),
                [destination]: [...prev[destination], task]
            }));
        }
    }

    return (
        <div className="mb-40 mx-4">
            <DndContext onDragEnd={handleDragEnd}>
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
                <div className="grid grid-cols-3 gap-4">
                    <Column tasks={tasks} type="todo" onDelete={deleteTask} />
                    <Column tasks={tasks} type="inProgress" onDelete={deleteTask} />
                    <Column tasks={tasks} type="done" onDelete={deleteTask} />
                </div>
            </DndContext>
        </div>
    )
}