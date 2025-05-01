import { useState } from "react"
import { v4 as uuidv4 } from 'uuid';

export default function TodoList() {
    let [todos, setTodos] = useState([{ task: "Eat", id: uuidv4(), isDone: false }])
    let [newTodo, setNewTodo] = useState("")

    let addNewTask = () => {
        setTodos((prevTodos) => {
            return [...prevTodos, { task: newTodo, id: uuidv4() }]
        })
        setNewTodo("")          //emptying input after adding task
    }

    let updateTodoValue = (event) => {
        setNewTodo(event.target.value)  //refers to the latest value of the input element
    }

    let deleteTodo = (id) => {
        setTodos((prevTodos) => prevTodos.filter((prevTodos) => prevTodos.id != id))  //filter method returns us new copy
    }

    let upperCaseAll = () => {
        setTodos((prevTodos) =>
            prevTodos.map((todo) => {
                return {
                    ...todo,
                    task: todo.task.toUpperCase()
                }
            })
        )
    }

    let upperCaseOne = (id) => {
        setTodos((prevTodos) =>
            prevTodos.map((todo) => {
                if (todo.id == id) {
                    return {
                        ...todo,
                        task: todo.task.toUpperCase()
                    }
                } else {
                    return todo
                }

            })
        )
    }
    return (
        <div>
            <input placeholder="Add a task" value={newTodo} onChange={updateTodoValue}></input>
            <br></br>
            <button onClick={addNewTask}>Add Task</button>
            <br></br><br></br><br></br>

            <hr></hr>
            <h4>Tasks Todo</h4>
            <ul>
                {
                    todos.map((todo) => (         //map is used to render array
                        <li key={todo.id}>
                            <span> {todo.task}</span>
                            &nbsp;&nbsp;&nbsp;
                            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                            <button onClick={() => upperCaseOne(todo.id)}>UpperCase One</button>
                        </li>
                    ))
                }
            </ul>
            <br></br>
            <button onClick={upperCaseAll}>UpperCase All</button>
        </div>
    )
}