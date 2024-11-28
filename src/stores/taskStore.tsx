import { create } from "zustand";

// Define Task type
export type Task = {
	id: number;
	title: string;
	completed: boolean;
};

// Define the Zustand store type
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

// Create Zustand store
export const useTaskStore = create<TaskStore>((set, get) => ({
	tasks: loadTasksFromLocalStorage(),

	addTask: (title: string) => {
		const updatedTasks: Task[] = [
			...get().tasks,
			{ id: Date.now(), title, completed: false },
		];
		saveTasksToLocalStorage(updatedTasks);
		set({ tasks: updatedTasks });
	},

	toggleTask: (id: number) => {
		const updatedTasks: Task[] = get().tasks.map((task) =>
			task.id === id ? { ...task, completed: !task.completed } : task
		);
		saveTasksToLocalStorage(updatedTasks);
		set({ tasks: updatedTasks });
	},

	removeTask: (id: number) => {
		const updatedTasks: Task[] = get().tasks.filter((task) => task.id !== id);
		saveTasksToLocalStorage(updatedTasks);
		set({ tasks: updatedTasks });
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
			saveTasksToLocalStorage(updatedTasks);
			set({ tasks: updatedTasks });
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
			saveTasksToLocalStorage(updatedTasks);
			set({ tasks: updatedTasks });
		}
	},

	getCompletedCount: () => {
		return get().tasks.filter((task) => task.completed).length;
	},

	getUncompletedCount: () => {
		return get().tasks.filter((task) => !task.completed).length;
	},
}));
