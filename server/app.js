//==TERMINAL==
//yarn add knex nodemon express pg
//adding "proxy": "http://localhost:3001" inside CLIENT PACKAGE.JSON 
const express = require('express');
const app = express()

//connecting to database with the server
const knex = require('knex')({
  client: 'pg',
  version: '7.2',
  connection: {
    host: '127.0.0.1',
    user: 'postgres',
    password: '6837',
    database: 'todo_app',
  },
})

app.use(express.json()) //access to the req.body
app.use(express.urlencoded({ extended: false }))

const todos = []

//==ROUTES==
//1.Create a todo
app.post('/api/todos', (req, res) => {
  const { description } = req.body
  let status = "active"
  knex.raw(`INSERT INTO todos (description, status, user_id) VALUES (?, ?, ?)`, [description, status, 1]).then((result => {
      res.json(result.rows)
    }))
})

//2.Read all todos
app.get('/api/todos', async (req, res) => {
  const todos = await knex.raw('SELECT * FROM todos ORDER BY id')
  const todo_rows = todos.rows
  res.json(todo_rows)
})

//3.Update a todo
app.patch('/api/todos/:id', (req, res) => {
  const id = req.params.id
  const { status } = req.body
  knex.raw(`UPDATE todos SET status = ? WHERE id = ?`, [status, id]).then((result => {
  res.json(result.rows)
  }))
})

//4.Delete a todo
app.delete('/api/todos/:id',  (req, res) => {
  const {id} = req.params
  knex.raw(`DELETE FROM todos WHERE id = ?`, [id]).then((result => {
  res.json(result.rows)
  }))
})

app.listen(3001, (req, res) => {
  console.log('listening on port 3001')
})
