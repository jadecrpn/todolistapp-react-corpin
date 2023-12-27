import React, { useState } from 'react';
import './App.css';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  function handleChange(e) {
    setInputValue(e.target.value);
  }

  const handleSubmit = () => {
    if (editIndex !== null) {
      // If editIndex is not null, update the existing todo
      const newTodos = [...todos];
      newTodos[editIndex] = { ...newTodos[editIndex], title: inputValue };
      setTodos(newTodos);
      setEditIndex(null);
    } else {
      // If editIndex is null, add a new todo
      setTodos([...todos, { id: todos.length + 1, title: inputValue, isChecked: false }]);
    }

    setInputValue('');
  };

  function handleDelete(index) {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
    setEditIndex(null);
  }

  function handleUpdate(index) {
    // Set the input value to the selected todo for editing
    setInputValue(todos[index].title);
    setEditIndex(index);
  }

  function handleCheckboxToggle(index) {
    const newTodos = [...todos];
    newTodos[index] = { ...newTodos[index], isChecked: !newTodos[index].isChecked };
    setTodos(newTodos);
  }

  return (
    <div>
      <div className="Intro">
        <div className="intro-content">
          <h1>Welcome to Jade Corpin</h1>
          <p>To-Do-list Application</p>
        </div>
      </div>

      <div className="todo-container">
        <h2>My List - My Goals</h2>

        <h2 className ="Todo-quote"> "People with goals succeed because they know where they're going." - Jade Corpin</h2>

        <div className="todo-input-container">
          <input
            type="text"
            className="Todo-text"
            placeholder="Add Item"
            onChange={handleChange}
            value={inputValue}
          />
          <button className="Todo-Buttons" onClick={() => handleSubmit()}>
            {editIndex !== null ? 'Update' : 'Add'}
          </button>
        </div>

        <ul className="todo-list">
          {todos.map((item, index) => (
            <li key={index} className={`Todo-outtext ${item.isChecked ? 'checked' : ''}`}>
              <span style={{ textDecoration: item.isChecked ? 'line-through' : 'none' }}>
                {item.title}
              </span>
              <div>
                <input
                  type="checkbox"
                  onChange={() => handleCheckboxToggle(index)}
                  checked={item.isChecked}/>

                <button
                  className="Todo-Buttons-Update" onClick={() => handleUpdate(index)}> Update </button>
                <button className="Todo-Buttons-Delete" onClick={() => handleDelete(index)}> Delete </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TodoList;
