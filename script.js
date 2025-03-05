document.addEventListener('DOMContentLoaded', function() {
    const taskForm = document.getElementById('taskForm');
    const taskInput = document.getElementById('taskInput');
    const dueDate = document.getElementById('dueDate');
    const priority = document.getElementById('priority');
    const taskList = document.getElementById('taskList');

    // Load tasks from local storage
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => addTaskToList(task));

    taskForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const taskText = taskInput.value.trim();
        const taskDueDate = dueDate.value;
        const taskPriority = priority.value;

        if (taskText !== '') {
            const task = {
                text: taskText,
                dueDate: taskDueDate,
                priority: taskPriority,
                completed: false
            };
            tasks.push(task);
            localStorage.setItem('tasks', JSON.stringify(tasks));

            addTaskToList(task);

            taskInput.value = '';
            dueDate.value = '';
            priority.value = 'Medium';
        }
    });

    function addTaskToList(task) {
        const listItem = document.createElement('li');

        const taskInfo = document.createElement('div');
        taskInfo.className = 'task-info';
        const taskText = document.createElement('p');
        taskText.textContent = task.text;
        const taskDetails = document.createElement('span');
        taskDetails.textContent = `Due: ${task.dueDate} | Priority: ${task.priority}`;
        taskInfo.appendChild(taskText);
        taskInfo.appendChild(taskDetails);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', function() {
            taskList.removeChild(listItem);
            const index = tasks.indexOf(task);
            tasks.splice(index, 1);
            localStorage.setItem('tasks', JSON.stringify(tasks));
        });

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.className = 'edit';
        editButton.addEventListener('click', function() {
            taskInput.value = task.text;
            dueDate.value = task.dueDate;
            priority.value = task.priority;
            taskList.removeChild(listItem);
            const index = tasks.indexOf(task);
            tasks.splice(index, 1);
            localStorage.setItem('tasks', JSON.stringify(tasks));
        });

        listItem.appendChild(taskInfo);
        listItem.appendChild(editButton);
        listItem.appendChild(deleteButton);
        taskList.appendChild(listItem);
    }
});
