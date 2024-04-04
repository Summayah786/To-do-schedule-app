#!/usr/bin/env node
import inquirer from "inquirer";
// Initialize an empty array to store tasks
let tasks = [];
// Function to display the main menu
function displayMenu() {
    console.log("\nWelcome to ToDo App!");
    inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'Choose an action:',
            choices: ['Add Task', 'Read Tasks', 'Update Task', 'Delete Task', 'Exit']
        }
    ]).then((answers) => {
        // Based on user's choice, call appropriate function
        switch (answers.action) {
            case 'Add Task':
                addTask();
                break;
            case 'Read Tasks':
                readTasks();
                break;
            case 'Update Task':
                updateTask();
                break;
            case 'Delete Task':
                deleteTask();
                break;
            case 'Exit':
                console.log('Goodbye!');
                break;
        }
    });
}
// Function to add a task
function addTask() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'taskText',
            message: 'Enter task:'
        }
    ]).then((answers) => {
        // Generate a unique ID for the task
        const taskId = tasks.length + 1;
        const newTask = {
            id: taskId,
            text: answers.taskText
        };
        tasks.push(newTask);
        console.log('Task added successfully!');
        displayMenu();
    });
}
// Function to read tasks
function readTasks() {
    console.log('\nTasks:');
    if (tasks.length === 0) {
        console.log('No tasks found.');
    }
    else {
        tasks.forEach(task => console.log(`- ${task.id}: ${task.text}`));
    }
    displayMenu();
}
// Function to update a task
function updateTask() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'taskId',
            message: 'Enter ID of task to update:'
        },
        {
            type: 'input',
            name: 'newText',
            message: 'Enter new text for the task:'
        }
    ]).then((answers) => {
        const taskId = parseInt(answers.taskId);
        const taskIndex = tasks.findIndex(task => task.id === taskId);
        if (taskIndex !== -1) {
            tasks[taskIndex].text = answers.newText;
            console.log('Task updated successfully!');
        }
        else {
            console.log('Task not found.');
        }
        displayMenu();
    });
}
// Function to delete a task
function deleteTask() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'taskId',
            message: 'Enter ID of task to delete:'
        }
    ]).then((answers) => {
        const taskId = parseInt(answers.taskId);
        const taskIndex = tasks.findIndex(task => task.id === taskId);
        if (taskIndex !== -1) {
            tasks.splice(taskIndex, 1);
            console.log('Task deleted successfully!');
        }
        else {
            console.log('Task not found.');
        }
        displayMenu();
    });
}
// Start the app by displaying the main menu
displayMenu();
