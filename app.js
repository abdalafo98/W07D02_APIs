const express = require("express");
const app = express();
const port = 3000;
const todos = [
  { todo: "wake up", isCompleted: false },
  { todo: "Eat Breakfast", isCompleted: false },
];
app.use(express.json());

app.get("/todos", (req, res) => {
  res.status(200);
  res.json(todos);
});

app.post("/create/todo", (req, res) => {
  const newTodo = { name: req.body.todo, isCompleted: req.body.isCompleted };
  todos.push(newTodo);
  res.status(201);
  res.json(newTodo);
});

app.put("/update/todo/:name", (req, res) => {
  const todo = req.params.name;
  let index;
  const found = todos.find((element, i) => {
    index = i;
    return element.todo === todo;
  });

  if (found) {
    todos[index] = { todo: req.body.todo, isCompleted: req.body.isCompleted };
    res.status(200);
    res.json(found);
  } else {
    res.status(404);
    res.json("not found");
  }
});

app.delete("/delete/todo/:name", (req, res) => {
  const todo = req.params.name;
  let index;
  const found = todos.find((element, i) => {
    index = i;
    return element.todo === todo;
  });

  if (found) {
    todos.splice(index, 1);
    res.status(200);
    res.json(found);
  } else {
    res.status(404);
    res.json("not found");
  }
  res.status(200);

  res.send(todo);
});

app.put("/complete/todo/:name", (req, res) => {
  const name = req.params.name;
  let index;
  const found = todos.find((element, i) => {
    index = i;
    return element.todo === name;
  });
  if (found) {
    todos[index] = { todo: name, isCompleted: true };
    res.status(200);
    res.json(todos[index]);
  } else {
    res.status(404);
    res.json("not found");
  }
  res.send("Set isCompleted true");
});
app.get("/completed/todos", (req, res) => {
  res.status(200);
  const filter = todos.filter((element, i) => {
    return element.isCompleted == true;
  });
  res.json(filter);
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
