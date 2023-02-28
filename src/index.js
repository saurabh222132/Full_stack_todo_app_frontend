import React from "react";
import ReactDOM from "react-dom/client";
import { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";

const baseUrl = "https://todoappbackend-yst8.onrender.com";

function Component1() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  const getInput = (e) => {
    setTodo(e.target.value);
  };

  const addingInList = async () => {
    if (todo !== "") {
      await setTodos([...todos, todo]);

      await axios
        .post(
          `${baseUrl}`,
          {
            todo: todo,
          },
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        )
        .then((response) => console.log(response));
    }
    setTodo("");
  };

  // Handle deleting of the values from database
  const handleDelet = (indx) => {
    const newtodos = todos.filter((todo, index) => {
      return indx !== index;
    });
    setTodos(newtodos);
    //sending post request to backend

    axios
      .post(
        `${baseUrl}/delete/`,
        { forDeletetodo: todos[indx] },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((response) => {
        console.log(response.data);
      });
  };

  // sending onload get request to server to get the stored tasks in database
  useEffect(() => {
    axios.get(`${baseUrl}/onload`).then((response) => {
      console.log("this array data comes from database", response.data);
      setTodos(response.data);
    });
  }, []);
  // window.onload = () => {
  //   axios.get(`${baseUrl}/onload`).then((response) => {
  //     console.log("this array data comes from database", response.data);
  //     setTodos(response.data);
  //     console.log(todos);
  //   });
  // };

  return (
    <div className="main container-fluid">
      <h1 style={{ color: "white", fontSize: "60px" }}>Todo App</h1>

      <input
        className="inputField"
        type="text"
        value={todo}
        onChange={getInput}
        placeholder="Add your tasks here. "
      />

      <button
        type="submit"
        onClick={addingInList}
        className="addBtn btn btn-info"
      >
        Add
      </button>

      <ul className="todo-list p-0">
        {todos.map((todo, index) => (
          <li className="box" key={index}>
            <h4 className="sn">{index + 1}. </h4>
            <div className="todo" key={index}>
              {todo}{" "}
            </div>
            <button
              className="deleteButton"
              type="button"
              onClick={() => handleDelet(index)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Component1 />
  </React.StrictMode>
);

/*
there is measure three task are happening 

1> when add button clicked:  then send the 'todo' data to server using post request
2> when delete button clicked : send the task which you want to delete 
3> when page is loaded : when page is loade then send a get request to server to get the tasks stored in the database. 


*/
