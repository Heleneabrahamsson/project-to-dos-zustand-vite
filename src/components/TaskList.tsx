import { useTaskStore } from "../stores/taskStore";
import { TaskItem } from "./TaskItem";
import "./TaskList.css";

export const TaskList = (): JSX.Element => {
	const tasks = useTaskStore((state) => state.tasks) || [];

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
