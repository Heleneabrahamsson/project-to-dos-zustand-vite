import { useState, FormEvent, ChangeEvent } from "react";
import { useTaskStore } from "../stores/taskStore";
import "./AddTaskForm.css";

export const AddTaskForm = (): JSX.Element => {
	const [title, setTitle] = useState<string>("");
	const addTask = useTaskStore((state) => state.addTask);

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (title.trim()) {
			addTask(title);
			setTitle("");
		}
	};

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setTitle(e.target.value);
	};

	return (
		<form className="add-task-form" onSubmit={handleSubmit}>
			<input
				type="text"
				value={title}
				onChange={handleChange}
				placeholder="What Needs to Be Done?"
				className="task-input"
			/>
			<button className="add-task-button" type="submit">
				+
			</button>
		</form>
	);
};
