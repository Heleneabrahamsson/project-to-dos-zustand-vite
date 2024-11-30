import { create } from "zustand";

// Defining Task type
export type Task = {
	id: number;
	title: string;
	completed: boolean;
};

// Defining types
export type TaskStore = {
	tasks: Task[];
	addTask: (title: string) => void;
	toggleTask: (id: number) => void;
	removeTask: (id: number) => void;
	moveTaskUp: (id: number) => void;
	moveTaskDown: (id: number) => void;
	getCompletedCount: () => number;
	getUncompletedCount: () => number;
};

// LocalStorage key
const LOCAL_STORAGE_KEY = "todo_tasks";

// Load tasks from localStorage
function loadTasksFromLocalStorage(): Task[] {
	const savedTasks = localStorage.getItem(LOCAL_STORAGE_KEY);
	return savedTasks ? JSON.parse(savedTasks) : [];
}

// Save tasks to localStorage
function saveTasksToLocalStorage(tasks: Task[]): void {
	localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
}

//  Zustand store
export const useTaskStore = create<TaskStore>((set, get) => {
	const updateTasks = (tasks: Task[]) => {
		saveTasksToLocalStorage(tasks);
		set({ tasks });
	};

	return {
		tasks: loadTasksFromLocalStorage(),

		addTask: (title: string) => {
			const updatedTasks: Task[] = [
				...get().tasks,
				{ id: Date.now(), title, completed: false },
			];
			updateTasks(updatedTasks);
		},

		toggleTask: (id: number) => {
			const updatedTasks: Task[] = get().tasks.map((task) =>
				task.id === id ? { ...task, completed: !task.completed } : task
			);
			updateTasks(updatedTasks);
		},

		removeTask: (id: number) => {
			const updatedTasks: Task[] = get().tasks.filter((task) => task.id !== id);
			updateTasks(updatedTasks);
		},

		moveTaskUp: (id: number) => {
			const tasks = get().tasks;
			const index = tasks.findIndex((task) => task.id === id);
			if (index > 0) {
				const updatedTasks = [...tasks];
				[updatedTasks[index - 1], updatedTasks[index]] = [
					updatedTasks[index],
					updatedTasks[index - 1],
				];
				updateTasks(updatedTasks);
			}
		},

		moveTaskDown: (id: number) => {
			const tasks = get().tasks;
			const index = tasks.findIndex((task) => task.id === id);
			if (index < tasks.length - 1) {
				const updatedTasks = [...tasks];
				[updatedTasks[index + 1], updatedTasks[index]] = [
					updatedTasks[index],
					updatedTasks[index + 1],
				];
				updateTasks(updatedTasks);
			}
		},

		getCompletedCount: () => {
			return get().tasks.filter((task) => task.completed).length;
		},

		getUncompletedCount: () => {
			return get().tasks.filter((task) => !task.completed).length;
		},
	};
});
