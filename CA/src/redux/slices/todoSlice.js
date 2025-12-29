/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 📋 TODO SLICE - A More Realistic Example
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * This slice demonstrates:
 * 1. Working with arrays in Redux
 * 2. CRUD operations (Create, Read, Update, Delete)
 * 3. Filtering and derived state
 * 4. More complex payload structures
 */

import { createSlice } from '@reduxjs/toolkit';

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 📝 INITIAL STATE
 * ═══════════════════════════════════════════════════════════════════════════
 */
const initialState = {
    items: [],           // Array of todo objects
    filter: 'all',       // 'all' | 'active' | 'completed'
    nextId: 1,           // Auto-increment ID
};

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 🔧 CREATE TODO SLICE
 * ═══════════════════════════════════════════════════════════════════════════
 */
const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        /**
         * ════════════════════════════════════════════════════════════════════
         * ADD TODO - Create operation
         * ════════════════════════════════════════════════════════════════════
         * 
         * Usage: dispatch(addTodo("Learn Redux"))
         * 
         * This demonstrates:
         * - Adding to array (push is allowed with Immer)
         * - Auto-generating IDs
         * - Setting default values
         */
        addTodo: (state, action) => {
            const newTodo = {
                id: state.nextId,
                text: action.payload,      // The todo text passed as payload
                completed: false,
                createdAt: new Date().toISOString(),
            };

            // ⬇️ Push to array (Immer makes this immutable internally)
            state.items.push(newTodo);
            state.nextId += 1;
        },

        /**
         * ════════════════════════════════════════════════════════════════════
         * TOGGLE TODO - Update operation
         * ════════════════════════════════════════════════════════════════════
         * 
         * Usage: dispatch(toggleTodo(1))  // Toggle todo with id=1
         * 
         * This demonstrates:
         * - Finding item in array
         * - Updating specific item
         */
        toggleTodo: (state, action) => {
            // ⬇️ Find the todo by ID
            const todo = state.items.find(item => item.id === action.payload);

            // ⬇️ If found, toggle its completed status
            if (todo) {
                todo.completed = !todo.completed;
            }
        },

        /**
         * ════════════════════════════════════════════════════════════════════
         * EDIT TODO - Update operation with multiple fields
         * ════════════════════════════════════════════════════════════════════
         * 
         * Usage: dispatch(editTodo({ id: 1, text: "Updated text" }))
         * 
         * This demonstrates:
         * - Payload as an object with multiple properties
         */
        editTodo: (state, action) => {
            // ⬇️ Destructure the payload
            const { id, text } = action.payload;

            const todo = state.items.find(item => item.id === id);
            if (todo) {
                todo.text = text;
                todo.updatedAt = new Date().toISOString();
            }
        },

        /**
         * ════════════════════════════════════════════════════════════════════
         * DELETE TODO - Delete operation
         * ════════════════════════════════════════════════════════════════════
         * 
         * Usage: dispatch(deleteTodo(1))  // Delete todo with id=1
         * 
         * This demonstrates:
         * - Removing from array using filter
         */
        deleteTodo: (state, action) => {
            // ⬇️ Filter out the deleted item
            state.items = state.items.filter(item => item.id !== action.payload);
        },

        /**
         * ════════════════════════════════════════════════════════════════════
         * SET FILTER - Change the view filter
         * ════════════════════════════════════════════════════════════════════
         */
        setFilter: (state, action) => {
            state.filter = action.payload; // 'all', 'active', or 'completed'
        },

        /**
         * ════════════════════════════════════════════════════════════════════
         * CLEAR COMPLETED - Delete multiple items
         * ════════════════════════════════════════════════════════════════════
         */
        clearCompleted: (state) => {
            state.items = state.items.filter(item => !item.completed);
        },

        /**
         * ════════════════════════════════════════════════════════════════════
         * TOGGLE ALL - Update all items
         * ════════════════════════════════════════════════════════════════════
         */
        toggleAll: (state) => {
            const allCompleted = state.items.every(item => item.completed);
            state.items.forEach(item => {
                item.completed = !allCompleted;
            });
        },

        /**
         * ════════════════════════════════════════════════════════════════════
         * REORDER TODOS - Move item position
         * ════════════════════════════════════════════════════════════════════
         * 
         * Usage: dispatch(reorderTodos({ fromIndex: 0, toIndex: 2 }))
         */
        reorderTodos: (state, action) => {
            const { fromIndex, toIndex } = action.payload;
            const [removed] = state.items.splice(fromIndex, 1);
            state.items.splice(toIndex, 0, removed);
        },
    },
});

// ═══════════════════════════════════════════════════════════════════════════
// 📤 EXPORT ACTIONS
// ═══════════════════════════════════════════════════════════════════════════
export const {
    addTodo,
    toggleTodo,
    editTodo,
    deleteTodo,
    setFilter,
    clearCompleted,
    toggleAll,
    reorderTodos,
} = todoSlice.actions;

// ═══════════════════════════════════════════════════════════════════════════
// 📤 EXPORT REDUCER
// ═══════════════════════════════════════════════════════════════════════════
export default todoSlice.reducer;

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 🎯 SELECTORS
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * These are functions that extract and compute data from state.
 * Using selectors improves:
 * - Code reusability
 * - Component decoupling from state shape
 * - Performance (when memoized)
 */

// ⬇️ Basic selectors
export const selectAllTodos = (state) => state.todos.items;
export const selectFilter = (state) => state.todos.filter;

// ⬇️ Derived/computed selectors
export const selectFilteredTodos = (state) => {
    const { items, filter } = state.todos;

    switch (filter) {
        case 'active':
            return items.filter(todo => !todo.completed);
        case 'completed':
            return items.filter(todo => todo.completed);
        default:
            return items;
    }
};

// ⬇️ Count selectors
export const selectTodoCount = (state) => state.todos.items.length;
export const selectActiveCount = (state) =>
    state.todos.items.filter(todo => !todo.completed).length;
export const selectCompletedCount = (state) =>
    state.todos.items.filter(todo => todo.completed).length;

// ⬇️ Selector to check if all are completed
export const selectAllCompleted = (state) =>
    state.todos.items.length > 0 &&
    state.todos.items.every(todo => todo.completed);
