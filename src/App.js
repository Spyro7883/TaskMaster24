import './App.css';
import { useState } from 'react'

export default function App() {
  const [containerList, setContainerList] = useState(() => {
    const savedContainers = localStorage.getItem('containerList');
    return savedContainers ? JSON.parse(savedContainers) : [];
  });
  const [manageOptions, setManageOptions] = useState(new Map())

  const createEntity = (index) => {
    let newContainerList = [...containerList];
    let key;
    if (index === undefined) {
      newContainerList.push(["Add a title"]);
      key = `${newContainerList.length - 1}`;
      manageOptions.set(key, false);
    } else if (newContainerList[index] && newContainerList[index][newContainerList[index].length - 1] !== "") {
      newContainerList[index].push("");
      key = `${newContainerList.length - 1}-${index}`;
      manageOptions.set(key, false);
    } else if (newContainerList[index][newContainerList[index].length - 1] === "") {
      console.log("Last task is empty");
    }
    else {
      console.log("Container does not exist");
    }
    setContainerList(newContainerList)
    setManageOptions(manageOptions)
    localStorage.setItem('containerList', JSON.stringify(newContainerList));
  }

  const copyEntity = (containerIndex, taskIndex) => {
    let newContainerList = [...containerList];
    if (taskIndex === undefined) {
      newContainerList.splice(containerIndex + 1, 0, newContainerList[containerIndex].filter(task => task));
    } else if (newContainerList[containerIndex][taskIndex]) {
      newContainerList[containerIndex].splice(taskIndex + 1, 0, newContainerList[containerIndex][taskIndex])
    } else {
      console.log("Task can't be copied");
    }
    setContainerList(newContainerList)
    localStorage.setItem('containerList', JSON.stringify(newContainerList));
  }

  const removeEntity = (containerIndex, taskIndex) => {
    let newContainerList = [...containerList];
    if (taskIndex === undefined) {
      newContainerList.splice(containerIndex, 1);
    } else if (newContainerList[containerIndex][taskIndex]) {
      newContainerList[containerIndex].splice(taskIndex, 1);
    } else {
      console.log("Task can't be removed");
    }
    setContainerList(newContainerList)
    localStorage.setItem('containerList', JSON.stringify(newContainerList));
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
    localStorage.setItem('containerList', JSON.stringify(newContainerList));
  }

  const showOptions = (state, containerIndex, taskIndex) => {
    let newOptions = new Map(manageOptions);

    if (taskIndex === undefined) {
      newOptions.set(containerIndex, !state)
    } else if (taskIndex !== undefined) {
      newOptions.set(`${containerIndex}-${taskIndex}`, !state)
    } else {
      console.log("Options can't be shown");
    }
    setManageOptions(newOptions)
  }

  return (
    <>
      <header>
        <h1>
          TodoList
        </h1>
      </header>
      <main>
        <button onClick={() => createEntity()} >Add a new list</button>
        {Object.entries(containerList).map(([containerIndex, tasks]) => (
          <section key={containerIndex} style={{ display: "flex" }}>
            <div>
              <button onClick={() => showOptions(manageOptions.get(containerIndex), containerIndex)}>Container Options</button>
              {manageOptions.get(containerIndex) ? <>
                <button onClick={() => copyEntity(containerIndex)}>Copy container</button>
                <button onClick={() => removeEntity(containerIndex)}>Remove container</button></> : <></>}
            </div>

            {tasks.map((task, taskIndex) => (<div key={taskIndex}>
              <div>
                <button onClick={() => showOptions(manageOptions.get(`${containerIndex}-${taskIndex}`), containerIndex, taskIndex)}>Task Options</button>
                {manageOptions.get(`${containerIndex}-${taskIndex}`) ? <>
                  <button onClick={() => copyEntity(containerIndex, taskIndex)}>Copy task</button>
                  <button onClick={() => removeEntity(containerIndex, taskIndex)}>Remove task</button></> : <></>}
              </div>
              <input
                key={`${containerIndex}-${taskIndex}`}
                type="text"
                onChange={handleInputChange(containerIndex, taskIndex)}
                value={task}
              />
            </div>
            ))}
            <button onClick={() => createEntity(containerIndex)}>Add a new task</button>
          </section>
        ))}

      </main >
      <footer />
    </>
  );

}