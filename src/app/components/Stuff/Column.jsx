import Card from "./Card";
import Droppable from "../Droppable";

export default function Column({ tasks, type, onDelete }) {
    return (
        <Droppable id={type}>
            <div className="rounded-lg p-2 border border-gray-200 text-lg">
                <h1 className="mb-2 border-b-2">
                    {type === 'todo' && 'Tasks to do'}
                    {type === 'inProgress' && 'In Progress'}
                    {type === 'done' && 'Done'}
                </h1>
                {tasks && tasks[type] && tasks[type].map((task, index) => (
                    <Card key={task.id} task={task} onDelete={onDelete} type={type} />
                ))}
            </div>
        </Droppable>
    );
};