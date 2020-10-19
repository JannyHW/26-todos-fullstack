import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getTodo, display, selectTodo } from "../todos/todosSlice.js"

export function Todos() {

  const dispatch = useDispatch()
  const todo = useSelector(selectTodo)
  const [description, setDescription] = useState("");

  useEffect(() => {
    dispatch(getTodo(todo))
  }, [])

  function handleChange(e) {
    setDescription(e.target.value)
  }
  console.log(description)

  return (
  <div>
    <div className="container">
      <h1 className="heading">Input Todos List</h1>
      <form 
        className="form">
          <input 
          className="input"
          type="text"
          value={description}
          onChange={handleChange}
          placeholder="enter your todo here"/>
          <button className="submitBtn">+</button>
      </form>
      <div className="itemHeading">
      <span>description</span>
       <span>status</span>
       </div>
    </div>
      <div className="wrap">
      <ul>
        {todo.map((todo) => (
              <li>
                <span>{todo.description}</span>
                <button className="status">{todo.status}</button>
                <button className="delete" >x</button>
              </li>
        ))}
      </ul>
    </div>
</div>
  )
}