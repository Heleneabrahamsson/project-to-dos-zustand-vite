import { useTaskStore } from "../stores/taskStore";
import { Task } from "../stores/taskStore";
import "./TaskItem.css";

// Define props type for TaskItem 
type TaskItemProps = {
	task: Task;
};

export const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
	const toggleTask = useTaskStore((state) => state.toggleTask);
	const removeTask = useTaskStore((state) => state.removeTask);
	const moveTaskUp = useTaskStore((state) => state.moveTaskUp);
	const moveTaskDown = useTaskStore((state) => state.moveTaskDown);

	return (
		<div className="task-item-wrapper">
			{/* Arrow buttons*/}
			<div className="task-arrows">
				<button
					className="move-button"
					onClick={() => moveTaskUp(task.id)}
					aria-label="Move task up"
				>
					⬆
				</button>
				<button
					className="move-button"
					onClick={() => moveTaskDown(task.id)}
					aria-label="Move task down"
				>
					⬇
				</button>
			</div>

			{/* Task content */}
			<div className="task-item">
				<label>
					<input
						type="checkbox"
						className="checkbox"
						checked={task.completed}
						onChange={() => toggleTask(task.id)}
					/>
					<span
						style={{
							textDecoration: task.completed ? "line-through" : "none",
							color: task.completed ? "white" : "white",
						}}
					>
						{task.title}
					</span>
				</label>

				<button
					className="delete-button"
					onClick={() => removeTask(task.id)}
					aria-label="Delete task"
				>
					<i className="fas fa-trash"></i>
				</button>
			</div>
		</div>
	);
};
