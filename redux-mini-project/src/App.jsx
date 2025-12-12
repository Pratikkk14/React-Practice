import React from 'react'
import TodoList from './components/TodoList';
import './App.css'

function App() {

  return (
    <>
      <div className="bg-white">
        <div className="bg-gray-800">
          <TodoList  />
        </div>
      </div>
    </>
  );
}

export default App
