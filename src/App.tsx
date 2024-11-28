import { AddTaskForm } from "./components/AddTaskForm";
import { TaskList } from "./components/TaskList";
import { TaskCount } from "./components/TaskCount";
import '@fortawesome/fontawesome-free/css/all.css';
import "./App.css";



export const App: React.FC = () => {
	return (
		<div className="app-container">
			<header>
				<h1>TO DO LIST</h1>
				<TaskCount />
			</header>
			<main>
				<AddTaskForm />
				<TaskList />
			</main>
		</div>
	);
};