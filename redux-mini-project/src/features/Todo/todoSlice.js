import { createSlice, nanoid } from "@reduxjs/toolkit";


const STATUS = ["In Progress", "Not Started"];

const initialState = {
    todos: [
        {
            id: 1,
            title: "Learn Redux Toolkit",
            text: "Complete the Redux Toolkit tutorial and build a mini project using slices and store configuration.",
            isDone: false,
            status: STATUS,
            currentStatus: "Not Started", // default value
        },
    ],
};

const Add = (state, action) => {
    const newTodo = {
        id: nanoid(),
        title: action.payload,
        text: "",
        isDone: false,
        status: STATUS,
        currentStatus: "Not Started"
    }
    state.todos.push(newTodo);
}

const Remove = (state, action) => {
    state.todos = state.todos.filter(todo => todo.id !== action.payload);
}

const Update = (state, action) => {
    state.todos = state.todos.map(todo =>
        todo.id === action.payload.id
            ? { ...todo, title: action.payload.text }
            : todo
    );
}

const Clear = (state) => {
    state.todos = [];
}
 
const ToggleisDone = (state, action) => {
    state.todos = state.todos.map(todo => todo.id === action.payload
        ? { ...todo, isDone: !todo.isDone }
        : todo        
    );
}

const ToggleStatus = (state, action) => { 
    state.todos = state.todos.map(
        todo => {
            if (todo.id === action.payload) {
                const currentIndex = STATUS.indexOf(todo.currentStatus);
                const nextIndex = (currentIndex + 1) % STATUS.length;
                return {
                    ...todo,
                    currentStatus: STATUS[nextIndex]
                };
            }
            return todo;
        }
    );
}

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: Add,
    removeTodo: Remove,
    updateTodo: Update,
    clearTodo: Clear,
    toggleisDone: ToggleisDone,
    toggleStatus: ToggleStatus,   
  },
});

export const { addTodo, removeTodo, updateTodo, clearTodo, toggleisDone, toggleStatus } = todoSlice.actions;
export default todoSlice.reducer;