import { useTaskStore } from "../stores/taskStore";
import { Task } from "../stores/taskStore";
import { TaskItem } from "./TaskItem";
import "./TaskList.css";

export const TaskList: React.FC = () => {
	const tasks: Task[] = useTaskStore((state) => state.tasks) || [];

	return (
		<div className="task-list">
			{tasks.map((task) => (
				<div key={task.id} className="task-container">
					<TaskItem task={task} />
				</div>
			))}
		</div>
	);
};