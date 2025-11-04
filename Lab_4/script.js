// Simple To-Do list
// Task class, tasks array, and DOM interactions

class Task {
	constructor(id, text, completed = false) {
		this.id = id;
		this.text = text;
		this.completed = completed;
	}
}

const taskInput = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');

let tasks = [];

// Utility: generate simple unique id
function uid() {
	return Date.now().toString(36) + Math.random().toString(36).slice(2,7);
}

function save() {
	try { localStorage.setItem('todo.tasks', JSON.stringify(tasks)); } catch(e){}
}

function load() {
	try {
		const raw = localStorage.getItem('todo.tasks');
		if (raw) {
			const parsed = JSON.parse(raw);
			tasks = parsed.map(t => new Task(t.id, t.text, t.completed));
		}
	} catch (e) { tasks = []; }
}

function render() {
	taskList.innerHTML = '';

	if (tasks.length === 0) {
		const empty = document.createElement('li');
		empty.className = 'empty';
		empty.textContent = 'No tasks yet — add one above ✨';
		taskList.appendChild(empty);
		return;
	}

	tasks.forEach(task => {
		const li = document.createElement('li');
		li.className = 'task-item';
		li.dataset.id = task.id;

		// checkbox for completion
		const checkbox = document.createElement('input');
		checkbox.type = 'checkbox';
		checkbox.className = 'task-checkbox';
		checkbox.checked = !!task.completed;
		// clicking checkbox should toggle completion but not bubble to li
		checkbox.addEventListener('click', (e) => { e.stopPropagation(); toggleTask(task.id); });

		const label = document.createElement('div');
		label.className = 'task-label' + (task.completed ? ' completed' : '');
		label.textContent = task.text;
		label.title = 'Click to toggle completion';
		label.addEventListener('click', () => toggleTask(task.id));

		const actions = document.createElement('div');
		actions.className = 'task-actions';

		const del = document.createElement('button');
		del.className = 'btn-icon';
		del.title = 'Delete task';
		del.innerHTML = '🗑️';
		del.addEventListener('click', (e) => { e.stopPropagation(); deleteTask(task.id); });

		actions.appendChild(del);

		li.appendChild(checkbox);
		li.appendChild(label);
		li.appendChild(actions);

		taskList.appendChild(li);
	});
}

function addTaskFromInput() {
	const text = taskInput.value.trim();
	if (!text) return;
	const t = new Task(uid(), text, false);
	tasks.unshift(t); // newest on top
	taskInput.value = '';
	save();
	render();
	taskInput.focus();
}

function toggleTask(id) {
	const t = tasks.find(x => x.id === id);
	if (!t) return;
	t.completed = !t.completed;
	save();
	render();
}

function deleteTask(id) {
	tasks = tasks.filter(x => x.id !== id);
	save();
	render();
}

// Events
addBtn.addEventListener('click', addTaskFromInput);
taskInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') addTaskFromInput(); });

// Initialize
load();
render();

