
--CREATE TABLE
CREATE TABLE todos (
  id int primary key,
  description text,
  status text,
  user_id int,
  foreign key (user_id)
  references users (id)
);

-- create
INSERT INTO todos (description, status, user_id) VALUES (?, ?, ?),
    [ req.body.description, req.body.status, req.body.user_id]

--read
SELECT * FROM todos

--update
UPDATE todos SET description = ?, status = ? WHERE user_id = ?, 
[req.body.description, req.body.status, req.body.user_id]

-- delete
DELETE FROM todos WHERE user_id = ?, 
[req.body.user_id]