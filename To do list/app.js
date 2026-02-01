// DOM elements
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const emptyState = document.getElementById('emptyState');
const totalTasksEl = document.getElementById('totalTasks');
const completedTasksEl = document.getElementById('completedTasks');
const remainingTasksEl = document.getElementById('remainingTasks');
const clearBtn = document.getElementById('clearBtn');
const filterBtns = document.querySelectorAll('.filter-btn');

// Task storage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let currentFilter = 'all';

// Initialize the app
function init() {
    renderTasks();
    updateStats();
    addEventListeners();
}

// Add event listeners
function addEventListeners() {
    addBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTask();
    });
    clearBtn.addEventListener('click', clearCompleted);
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentFilter = e.target.dataset.filter;
            renderTasks();
        });
    });
}


// Add a new task


function addTask() {
    const taskText = taskInput.value.trim();
    
    if (taskText === '') {
        taskInput.focus();
        return;
    }

    const task = {
        id: Date.now(),
        text: taskText,
        completed: false,
        createdAt: new Date().toLocaleString()
    };

    tasks.unshift(task);
    saveTasks();
    renderTasks();
    updateStats();
    taskInput.value = '';
    taskInput.focus();
}

// Toggle task completion
function toggleTask(id) {
    tasks = tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
    );
    saveTasks();
    renderTasks();
    updateStats();
}

// Delete a task
function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    renderTasks();
    updateStats();
}

// Clear all completed tasks
function clearCompleted() {
    if (tasks.some(t => t.completed)) {
        if (confirm('Are you sure you want to delete all completed tasks?')) {
            tasks = tasks.filter(task => !task.completed);
            saveTasks();
            renderTasks();
            updateStats();
        }
    }
}

// Filter tasks based on current filter
function getFilteredTasks() {
    switch(currentFilter) {
        case 'active':
            return tasks.filter(task => !task.completed);
        case 'completed':
            return tasks.filter(task => task.completed);
        default:
            return tasks;
    }
}

// Render tasks
function renderTasks() {
    taskList.innerHTML = '';
    const filteredTasks = getFilteredTasks();

    if (filteredTasks.length === 0) {
        emptyState.classList.add('show');
        taskList.innerHTML = '';
        return;
    }

    emptyState.classList.remove('show');

    filteredTasks.forEach(task => {
        const li = document.createElement('li');
        li.className = `task-item ${task.completed ? 'completed' : ''}`;
        
        li.innerHTML = `
            <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTask(${task.id})">
            <span class="task-text">${escapeHtml(task.text)}</span>
            <button class="task-delete" onclick="deleteTask(${task.id})"><i class="fas fa-trash-alt"></i> Delete</button>
        `;
        
        taskList.appendChild(li);
    });
}

// Update statistics
function updateStats() {
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    const remaining = total - completed;

    totalTasksEl.textContent = total;
    completedTasksEl.textContent = completed;
    remainingTasksEl.textContent = remaining;
}

// Save tasks to localStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

// Initialize app on page load
document.addEventListener('DOMContentLoaded', init);

