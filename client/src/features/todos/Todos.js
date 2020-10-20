
import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getTodo, selectTodo, addTodo, removeTodo, updateTodo } from "../todos/todosSlice.js"

export function Todos() {
  const dispatch = useDispatch()
  const todo = useSelector(selectTodo)
  const [inputText, setInputText] = useState("")

  useEffect(() => {
    dispatch(getTodo(todo))
  }, [])

  function handleSubmit(e) {
    e.preventDefault()
    dispatch(addTodo(inputText))
    setInputText("");
  }
  
  function handleUpdate(id, status) {
    dispatch(updateTodo({id, status}))
  }
  
  function handleDelete(item) {
    dispatch(removeTodo(item.id))
  }

  return (
      <>
        <div className="container">
          <h1 className="heading">Input Todos List</h1>

          <form 
            onSubmit={handleSubmit}
            className="form">
              <input 
              className="input"
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="enter your todo here"/>
              <button type="submit" className="submitBtn">+</button>
          </form>

          <div className="itemHeading">
          <span>description</span>
          <span>status</span>
          </div>
        </div>

        <div className="wrap">
          <ul>
            {todo.map((item) => (
                <li key={item.id} id={item.id}>
                    <span>{item.description}</span>  
                    <div className="status">{item.status}</div>
                    <button className="statusBtns completed" type="submit" onClick={() => handleUpdate(item.id, 'completed')}>completed</button>
                    <button className="statusBtns active" type="submit" onClick={() => handleUpdate(item.id, 'active')}>active</button>
                    <button 
                    onClick={() => handleDelete(item)}
                    className="delete">x</button>
                </li>
            ))}
          </ul>
        </div>
    </>
  )
}