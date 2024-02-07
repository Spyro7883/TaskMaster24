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

  const createEntity = (index) => {
    let newContainerList = [...containerList];
    if (index === undefined) {
      newContainerList.push(["Add a title"])
    } else if (newContainerList[index]) {
      newContainerList[index].push("");
    } else {
      console.log("Container does not exist");
    }
    setContainerList(newContainerList)
  }

  const copyContainer = (containerIndex) => {
    let newContainerList = [...containerList];
    newContainerList.splice(containerIndex + 1, 0, newContainerList[containerIndex])
    setContainerList(newContainerList)
  }

  const handleInputChange = (containerIndex, taskIndex) => (e) => {
    let newContainerList = [...containerList];

    if (newContainerList[containerIndex]) {
      if (taskIndex < newContainerList[containerIndex].length) {
        newContainerList[containerIndex][taskIndex] = e.target.value;
      } else {
        console.log("Task does not exist");
      }
    } else {
      console.log("Container does not exist");
    }
    setContainerList(newContainerList);
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
        <button onClick={() => createEntity()} >Add a new list</button>
        <button onClick={() => console.log(containerList)} >Show container list</button>
        {Object.entries(containerList).map(([containerIndex, tasks]) => (
          <div key={containerIndex}>
            <button onClick={() => copyContainer(containerIndex)}>Copy container</button>
            {tasks.map((task, taskIndex) => (
              <input
                key={`${containerIndex}-${taskIndex}`}
                type="text"
                onChange={handleInputChange(containerIndex, taskIndex)}
                value={task}
              />
            ))}
            <button onClick={() => createEntity(containerIndex)}>Add a new task</button>
          </div>
        ))}

      </main>
      <footer />
    </>
  );

}