import Todo from "./components/Todo";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import React, { useState } from "react";
import { nanoid } from "nanoid";


function App() {
  const FILTER_MAP = {
    All: () => true,
    Active: (todo) => !todo.completed,
    Completed: (todo) => todo.completed
  };
  const FILTER_NAMES = Object.keys(FILTER_MAP);


  const [filter, setFilter] = useState('All');
  const [todos, setTodos] = useState([
    { id: "todo-0", name: "Eat", completed: true },
    { id: "todo-1", name: "Sleep", completed: false },
  ]);

  function onSubmit(name) {
    const newTodo = { id: `todo-${nanoid()}`, name, completed: false };
    setTodos([...todos, newTodo])
  }

  function toggleCompleted(id) {
    const updatedTodos = todos.map(todo => {
      if (id === todo.id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    })
    setTodos(updatedTodos);
  }

  function onDelete(id) {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
  }

  function onEdit(id, newName) {
    const updatedTodos = todos.map(todo => {
      if (id === todo.id) {
        return { ...todo, name: newName };
      }
      return todo;
    })
    setTodos(updatedTodos);
  }

  return (
    <div className="todoapp stack-large">
      <h1>todo</h1>
      <Form onSubmit={onSubmit} />
      <div className="filters btn-group stack-exception">
        {FILTER_NAMES.map(name => (
          <FilterButton
            key={name}
            name={name}
            isPressed={name === filter}
            setFilter={setFilter}
          />
        ))}
      </div>
      <h2 id="list-heading">{todos.filter(FILTER_MAP[filter]).length} todos in {filter} list</h2>
      <ul
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading">
        {todos
          .filter(FILTER_MAP[filter])
          .map(todo => (
            <Todo
              id={todo.id}
              key={todo.id}
              name={todo.name}
              completed={todo.completed}
              toggleCompleted={toggleCompleted}
              onDelete={onDelete}
              onEdit={onEdit} />
          ))}
      </ul>
    </div>
  );
}

export default App;
