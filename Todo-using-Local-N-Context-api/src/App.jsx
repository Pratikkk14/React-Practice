import './App.css'
import { TodoContextProvider } from './Context';
import { useState, useEffect } from 'react';
import TodoList from './Components/TodoList';
function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos(prev => [{id: Date.now(), title: todo.title, text: todo.text, isDone: false, currentStatus: "Not Started"}, ...prev])
  }

  const updateTodo = (id, updates) => {
    setTodos(prev => prev.map((prevTodo) => (id === prevTodo.id ? { ...prevTodo, ...updates } : prevTodo)))
  }

  const removeTodo = (id) => {
    setTodos(prev => prev.filter((todo) => todo.id !== id))
  }

  const toggleisDone = (id) => {
    setTodos(prev => prev.map((todo) =>
      todo.id === id ? { ...todo, isDone: !todo.isDone } : todo))
  }

  const toggleStatus = (id) => {
    const STATUS = ["Not Started", "In Progress", "Completed"];
    setTodos(prev => prev.map((todo) => {
      if (todo.id === id) {
        const currentIndex = STATUS.indexOf(todo.currentStatus);
        const nextIndex = (currentIndex + 1) % STATUS.length;
        return {
          ...todo,
          currentStatus: STATUS[nextIndex]
        };
      }
      return todo;
    }));
  }

  const clearTodo = () => {
    setTodos([]);
  }

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));

    if (todos && todos.length > 0) {
      setTodos(todos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);
  

  return (
    <>
      <TodoContextProvider
        value={{
          todos,
          addTodo,
          updateTodo,
          removeTodo,
          toggleisDone,
          toggleStatus,
          clearTodo}}  
      >
        <TodoList />
      </TodoContextProvider>
    </>
  );
}

export default App
