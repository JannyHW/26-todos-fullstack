//==TERMINAL==
//yarn add knex sqlite3 nodemon express pg
//adding "proxy": "http://localhost:3001" inside CLIENT PACKAGE.JSON 

const express = require('express')
const app = express()

app.use(express.json()) //access to the req.body
app.use(express.urlencoded({extended: false}))

//connecting to database with the server
const knex = require('knex')({
    client: 'sqlite3',
    connection: {
      filename: "./todo_app.db"
    }
});

//==ROUTES==
//1.Create a todo
app.post('/api/todos', (req, res) => {
    knex.raw(`INSERT INTO todos (description, status, user_id) VALUES (?, ?, ?)`,
    [ req.body.description, req.body.status, req.body.user_id])
    .then((result) => {
        res.json(result)
    })
})

//2.Read all todos
app.get('/api/todos', (req, res) => {
    knex.raw('SELECT * FROM todos').then(result => {
        // NOTE: result is not in rows - unlike postgres
        res.json(result)
    })
})

//3.Update a todo
app.put('/api/todos/:id', (req, res) => {
  knex.raw(`UPDATE todos SET description = ?, status = ? WHERE user_id = ?`, [req.body.description, req.body.status, req.body.user_id]).then((result => {
  res.json(result)
  }))
})

//4.Delete a todo
app.delete('/api/todos/:id',  (req, res) => {
  knex.raw(`DELETE FROM todos WHERE user_id = ?`, [req.body.user_id]).then((result => {
  res.json(result)
  }))
})


app.listen(3001, () => {
    console.log('listening on port 3001')
})