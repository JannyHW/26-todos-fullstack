
// yarn add axios react-router react-router-dom inside CLIENT
import { createSlice } from '@reduxjs/toolkit';
import axios from "axios"

export const todosSlice = createSlice({
  name: 'todos',
  initialState: {
    todos: [],
  },

  reducers: {
    display: (state, action) => {
      state.todos = action.payload;
    },
   },
});

export const { display } = todosSlice.actions;

export const getTodo = () => (dispatch) => {
  axios.get("/api/todos").then((r) => dispatch(display(r.data)))
}

export const selectTodo = (state) => state.todos.todos;

export default todosSlice.reducer;