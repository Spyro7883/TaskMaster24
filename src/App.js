import './App.css';
// import { createTask, copyTask, removeTask, createList, copyList, removeList } from "./TodoFunctions.js";
import { useState } from 'react'


export default function App() {
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
  const [taskInput, setTaskInput] = useState('');
  const createContainer = () => {
    const entityContainer = []
    entityContainer.push("test var")
    setContainerList([...containerList, entityContainer])
  }

  const createTask = (index) => {
    let newContainerList = [...containerList];

    if (newContainerList[index]) {
      newContainerList[index] = [...newContainerList[index], ""];
    } else {
      console.log("Container does not exist");
    }

    setContainerList(newContainerList);
  }

  const handleInputChange = (e) => {
    const value = e.target.value;
    setTaskInput(value)
    // let newContainerList = [...containerList];

    // if (newContainerList[c_index][t_index]) {
    //   newContainerList[c_index][t_index] = [...newContainerList[c_index][t_index], value];
    // } else {
    //   console.log("Container does not exist");
    // }
    // setContainerList(newContainerList);
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
        {containerList.map((item, c_index) =>
          <div key={c_index}>
            {item.map((t_item, t_index) =>
              <input key={t_index} type="text" onChange={handleInputChange} value={t_item} />
            )}
            <button onClick={() => createTask(c_index)} >Add a new task</button>
          </div>
        )}
      </main>
      <footer />
    </>
  );

}