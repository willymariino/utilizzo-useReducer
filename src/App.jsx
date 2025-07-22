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

function App() {

  const [text, setText] = useState("");

  const initialTask = [

    {
      text: "fare la spesa",
      completed: false
    },

    {
      text: "fare il bucato",
      completed: false
    }

  ];

  const [tasks, dispatchTasks] = useReducer(TasksReducer, initialTask);

  return (
    <>
      <h1>Lista di cose da fare</h1>

      <input
        type="text"
        placeholder='Aggiungi Task'
        value={text}
        onChange={e => setText(e.target.value)}
      />

      <button onClick={() => dispatchTasks({ type: "ADD_TASK", payload: text })}>
        aggiungi Task
      </button>

      <ul>
        {tasks.map((task, i) => (

          <li key={i}>

            <p onClick={() => toggleTask(i)}>
              {task.completed ? <s>{task.text}</s> : task.text}
            </p>



            <button onClick={() => deleteTask(i)}> Elimina </button>,
            <button onClick={() => cloneTask(i)}> Duplica </button>

          </li>
        ))}

      </ul>

    </>
  )

}

export { App, TasksReducer }