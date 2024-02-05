import './App.css';
// import { createTask, copyTask, removeTask, createList, copyList, removeList } from "./TodoFunctions.js";
import { useState } from 'react'


export default function App() {
  const [state, setState] = useState('')
  const [tasksOptions, setTasksOptions] = useState('')
  const [containerOptions, setContainerOptions] = useState('')
  const [containerList, setContainerList] = useState(() => {
    const savedContainers = localStorage.getItem('containerList');
    return savedContainers ? JSON.parse(savedContainers) : [];
  });
  const [tasksList, setTasksList] = useState(() => {
    const savedTasks = localStorage.getItem('tasksList');
    return savedTasks ? JSON.parse(savedTasks) : [];

  });
  const createContainer = () => {
    console.log("in creation")
    const entityContainer = []
    setContainerList([...containerList, entityContainer])
    // containerList.map((values) => console.log(values))
  }

  const createTask = () => {
    console.log("in creation")
    const entityTask = []
    setTasksList([...tasksList, entityTask])
  }

  const handleInputChange = (e) => {
    const value = e.target.value;
    setState(value);
  }

  return (
    <>
      <header>
        <h1>
          TodoList
        </h1>

      </header>
      <main>
        {/* {containerList.map((container) =>
          <section>
            {container.title ? <input>{container.title}</input> : <input>Enter list title</input>}
            <button onClick={() => { setContainerOptions(true) }}>
              <div>
                <button onClick={setContainerOptions(false)}>❌</button>
                 <button onClick={'copyContainer'}>Copy List</button>
                  <button onClick={'removeContainer'}>Remove List</button>
              </div>
            </button>

            {tasksList.map((task) =>
              <div>
                <p>{task.name}</p>
                <button onClick={() => { setTasksOptions(true) }}>
                  <div>
                    <button onClick={setTasksOptions(false)}>Option</button>
                    <button onClick={'copyInput'}><Img /></button>
                    <button onClick={'removeInput'}><Img /></button>
                  </div>
                </button>
              </div>
            )}
            <button onClick={'createInput'}>Add new task</button>
          </section>)
        } */}
        <button onClick={createContainer} >Add a new list</button>
        {containerList.map((item, index) =>
          <div key={index}>
            {tasksList.map((item, index) =>
              <input key={index} onClick={handleInputChange}>

              </input>)}
            <button onClick={createTask} >Add a new task</button>
          </div>
        )}
      </main>
      <footer />
    </>
  );

}