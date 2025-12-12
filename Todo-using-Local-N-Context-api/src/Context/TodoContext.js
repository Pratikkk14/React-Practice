import { useContext, createContext } from 'react'

export const TodoContext = createContext({
    todo: [{
        id: 1,
        title: "Learn Redux Toolkit",
        text: "Complete the Redux Toolkit tutorial and build a mini project using slices and store configuration.",
        isDone: false,
        status: ["Not Started", "In Progress"],
        currentStatus: "Not Started", // default value
    },],
    addTodo: (todo) => { },
    updateTodo: (id, text) => { },
    removeTodo: (id) => { },
    toggleisDone: (id) => { },
    toggleStatus: (id) => { },
    clearTodo: () => { },
});

export const useTodo = () => useContext(TodoContext);

export const TodoContextProvider = TodoContext.Provider;