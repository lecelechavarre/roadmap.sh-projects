// Task Tracker Application
let tasks = [];

// Pre-populate with the example tasks from the design
const initialTasks = [
    { id: null, description: "New task is created and added to the list", completed: false },
    { id: null, description: "Clicking the checkbox toggles the completeness", completed: false },
    { id: null, description: "Delete button will delete the task from the list", completed: false },
    { id: null, description: "Complete tasks show at the end with strikethrough", completed: true },
    { id: null, description: "Marking incomplete will put it back in pending list", completed: false }
];

// DOM Elements
const taskList = document.getElementById('taskList');

// Generate unique ID
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Initialize tasks with IDs
function initializeTasks() {
    tasks = initialTasks.map(task => ({
        ...task,
        id: generateId()
    }));
}

// Render tasks to the DOM
function renderTasks() {
    // Clear the task list
    taskList.innerHTML = '';
    
    // Separate pending and completed tasks
    const pendingTasks = tasks.filter(task => !task.completed);
    const completedTasks = tasks.filter(task => task.completed);
    
    // Combine: pending first, then completed
    const sortedTasks = [...pendingTasks, ...completedTasks];
    
    // Create and append each task
    sortedTasks.forEach(task => {
        const li = document.createElement('li');
        li.className = 'task-item';
        
        // Create checkbox
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'task-checkbox';
        checkbox.checked = task.completed;
        checkbox.addEventListener('change', () => toggleTaskComplete(task.id));
        
        // Create content wrapper
        const contentDiv = document.createElement('div');
        contentDiv.className = 'task-content';
        
        // Create task text
        const taskText = document.createElement('span');
        taskText.className = 'task-text';
        if (task.completed) {
            taskText.classList.add('completed');
        }
        taskText.textContent = task.description;
        taskText.addEventListener('click', () => toggleTaskComplete(task.id));
        
        // Create delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = '×';
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            deleteTask(task.id);
        });
        
        // Assemble the task item
        contentDiv.appendChild(taskText);
        contentDiv.appendChild(deleteBtn);
        li.appendChild(checkbox);
        li.appendChild(contentDiv);
        
        taskList.appendChild(li);
    });
}

// Add a new task
function addTask(description) {
    description = description.trim();
    
    if (description === '') {
        return false;
    }
    
    const newTask = {
        id: generateId(),
        description: description,
        completed: false
    };
    
    tasks.push(newTask);
    renderTasks();
    return true;
}

// Toggle task completion status
function toggleTaskComplete(taskId) {
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    
    if (taskIndex !== -1) {
        tasks[taskIndex].completed = !tasks[taskIndex].completed;
        renderTasks();
    }
}

// Delete a task
function deleteTask(taskId) {
    tasks = tasks.filter(task => task.id !== taskId);
    renderTasks();
}

// Create input element for adding new tasks
function createInputField() {
    const inputWrapper = document.createElement('div');
    inputWrapper.className = 'input-wrapper';
    
    const input = document.createElement('input');
    input.type = 'text';
    input.id = 'taskInput';
    input.placeholder = 'Start writing and press enter to create task';
    input.autocomplete = 'off';
    
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const success = addTask(input.value);
            if (success) {
                input.value = '';
            }
        }
    });
    
    inputWrapper.appendChild(input);
    
    // Insert input after instruction and before task list
    const instruction = document.querySelector('.instruction');
    instruction.insertAdjacentElement('afterend', inputWrapper);
    
    input.focus();
}

// Initialize the application
function init() {
    initializeTasks();
    createInputField();
    renderTasks();
}

// Start the app
init();