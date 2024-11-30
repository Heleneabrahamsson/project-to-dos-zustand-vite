import { useTaskStore } from "../stores/taskStore";
import "./TaskCount.css";

export const TaskCount = (): JSX.Element => {
	const tasks = useTaskStore((state) => state.tasks);
	const completedCount = tasks.filter((task) => task.completed).length;
	const uncompletedCount = tasks.filter((task) => !task.completed).length;

	return (
		<div className="count-text">
			<p>✓ Dealt With: {completedCount}</p>
			<p>⏳ Still Haunting You: {uncompletedCount}</p>
		</div>
	);
};
