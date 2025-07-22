import { useState, useReducer } from 'react'

// useReducer applicato alla centralizzazione della logica di una to-do list, al posto di avere tutte funzioni separate.

function TasksReducer(tasks, action) {
  switch (action.type) {

    case "ADD_TASK":
      if (!action.payload.trim()) return tasks;
      const taskToAdd = {
        text: action.payload.trim(),
        completed: false
      };
      return [...tasks, taskToAdd];

    case "TOGGLE_TASK":
      return tasks.map((task, index) => {
        if (index === action.payload) {
          return { ...task, completed: !task.completed }
        }
        return task;
      })

    case "DELETE_TASK":
      return tasks.filter((task, index) => {
        return index !== action.payload;

      })

    case "CLONE_TASK":
      const taskToClone = tasks[action.payload]
      return [...task, taskClone]

    default:
      return tasks;



  }


}

export default TasksReducer
