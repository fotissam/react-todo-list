import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [toDoList, setToDoList] = useState([]);
  const loggedInUser = localStorage.getItem("loggedInUser");

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const user = storedUsers.find((u) => u.username === loggedInUser);
    if (user && user.toDoList) {
      setToDoList(user.toDoList);
    }
  }, [loggedInUser]);

  const saveUserToDoList = useCallback(
    (updatedList) => {
      const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
      const updatedUsers = storedUsers.map((user) =>
        user.username === loggedInUser
          ? { ...user, toDoList: updatedList }
          : user
      );
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      console.log(storedUsers);
    },
    [loggedInUser]
  );

  const handleAddToDo = (newToDoItem) => {
    const updatedList = [...toDoList, newToDoItem];
    setToDoList(updatedList);
    console.log(updatedList);
  };

  const handleRemoveToDo = (id) => {
    const updatedList = toDoList.filter((item) => item.id !== id);
    setToDoList(updatedList);
    saveUserToDoList(updatedList);
  };

  const handleCompleteItem = (id) => {
    const updatedList = toDoList.map((item) =>
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    setToDoList(updatedList);
    saveUserToDoList(updatedList);
  };

  useEffect(() => {
    saveUserToDoList(toDoList);
  }, [toDoList, saveUserToDoList]);

  return (
    <>
      <h2>Welcome to the Home Page, {loggedInUser}</h2>
      <Logout />
      <Form handleAddToDo={handleAddToDo} />
      <ToDoWrapper
        toDoList={toDoList}
        handleRemoveToDo={handleRemoveToDo}
        handleCompleteItem={handleCompleteItem}
      />
    </>
  );
}

export default Home;

// Form component
function Form({ handleAddToDo }) {
  const [toDoItemValue, setToDoItemValue] = useState("");

  const handleInput = (e) => {
    e.preventDefault();
    if (!toDoItemValue) {
      alert("Please insert your to-do");
      return;
    }
    const newToDoItem = {
      id: Date.now(),
      todoItem: toDoItemValue,
      completed: false,
    };
    handleAddToDo(newToDoItem);
    setToDoItemValue("");
  };

  return (
    <>
      <form className="form-inline" onSubmit={handleInput}>
        <span>Make your own to-do: </span>
        <div className="input-group gap-2">
          <input
            type="text"
            placeholder="Type your to-do..."
            value={toDoItemValue}
            onChange={(e) => setToDoItemValue(e.target.value)}
            className="form-control"
          />
          <span className="input-group-btn">
            <button className="btn btn-primary ml-1" type="submit">
              Add
            </button>
          </span>
        </div>
      </form>
    </>
  );
}

// ToDoWrapper component
function ToDoWrapper({ toDoList, handleRemoveToDo, handleCompleteItem }) {
  return (
    <div className="mt-5">
      <div className="list">
        <ul className="list-group">
          {toDoList.map((item) => (
            <Item
              item={item}
              key={item.id}
              handleRemoveToDo={handleRemoveToDo}
              handleCompleteItem={handleCompleteItem}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

// Item component
function Item({ item, handleRemoveToDo, handleCompleteItem }) {
  return (
    <li
      className={
        item.completed
          ? "list-group-item mb-2 completed-task"
          : "list-group-item mb-2"
      }
    >
      <span>{item.todoItem}</span>
      <span> </span>
      <button
        className="border-0 bg-white bg-transparent"
        onClick={() => handleRemoveToDo(item.id)}
      >
        🗑️
      </button>
      <button
        className="border-0 bg-transparent"
        onClick={() => handleCompleteItem(item.id)}
      >
        {item.completed ? "➖" : "✅"}
      </button>
    </li>
  );
}

// Logout component
function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/login");
  };

  return (
    <div className="mb-4 btn-group btn-group-sm">
      <button className="btn btn-danger" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}
