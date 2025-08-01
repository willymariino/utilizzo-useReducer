import { useState, useReducer } from 'react'

// useReducer applicato alla centralizzazione della logica di una to-do list, al posto di avere tutte funzioni separate.

function TasksReducer(tasks, action) {
  switch (action.type) {

    case "ADD_TASK": {
      if (!action.payload.trim()) return tasks;
      const taskToAdd = {
        text: action.payload.trim(),
        completed: false
      }
      return [...tasks, taskToAdd];
    }

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

    case "CLONE_TASK": {
      const taskToClone = tasks[action.payload]
      return [...tasks, taskToClone]
    }

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

      <button onClick={() => {
        dispatchTasks({ type: "ADD_TASK", payload: text })
        setText("")
      }}>
        aggiungi Task
      </button>

      <ul>
        {tasks.map((task, index) => (

          <li key={index}>

            <p onClick={() => dispatchTasks({ type: "TOGGLE_TASK", payload: index })}>
              {task.completed ? <s>{task.text}</s> : task.text}
            </p>



            <button onClick={() => dispatchTasks({ type: "DELETE_TASK", payload: index })}> Elimina </button>
            <button onClick={() => dispatchTasks({ type: "CLONE_TASK", payload: index })}> Duplica </button>

          </li>
        ))}

      </ul>

    </>
  )

}

export { App, TasksReducer }