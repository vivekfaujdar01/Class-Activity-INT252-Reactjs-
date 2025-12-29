/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 🍕 COUNTER SLICE - Understanding createSlice
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * WHAT IS A SLICE?
 * ────────────────
 * A "slice" is a portion of the Redux state along with the logic (reducers)
 * to update that portion. It's like a pizza slice - a piece of the whole!
 * 
 * createSlice() creates:
 * 1. REDUCER - function that handles state updates
 * 2. ACTIONS - automatically generated from reducer names
 * 
 * Before Redux Toolkit, you had to write these separately!
 */

import { createSlice } from '@reduxjs/toolkit';

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 📝 INITIAL STATE
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * This is the starting state when the app loads.
 * Think of it as the default values.
 */
const initialState = {
    value: 0,        // The counter value
    incrementBy: 1,  // Default increment amount
    history: [],     // Track all changes
};

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 🔧 CREATE THE SLICE
 * ═══════════════════════════════════════════════════════════════════════════
 */
const counterSlice = createSlice({
    // ⬇️ Name used in action types: "counter/increment"
    name: 'counter',

    // ⬇️ Starting state
    initialState,

    // ⬇️ REDUCERS - Functions that update the state
    reducers: {
        /**
         * ════════════════════════════════════════════════════════════════════
         * INCREMENT ACTION
         * ════════════════════════════════════════════════════════════════════
         * 
         * WHAT HAPPENS WHEN YOU CALL THIS:
         * 1. dispatch(increment()) is called from component
         * 2. Redux finds this reducer
         * 3. This function runs and updates the state
         * 4. All subscribed components re-render with new value
         * 
         * IMPORTANT: We're "mutating" state directly here!
         * This is ONLY allowed because Redux Toolkit uses Immer.js
         * Under the hood, it creates a new immutable state.
         */
        increment: (state) => {
            // ⬇️ Looks like mutation, but Immer makes it immutable!
            state.value += state.incrementBy;
            state.history.push({
                action: 'increment',
                value: state.value,
                timestamp: new Date().toISOString(),
            });
        },

        /**
         * ════════════════════════════════════════════════════════════════════
         * DECREMENT ACTION
         * ════════════════════════════════════════════════════════════════════
         */
        decrement: (state) => {
            state.value -= state.incrementBy;
            state.history.push({
                action: 'decrement',
                value: state.value,
                timestamp: new Date().toISOString(),
            });
        },

        /**
         * ════════════════════════════════════════════════════════════════════
         * INCREMENT BY AMOUNT - Using payload
         * ════════════════════════════════════════════════════════════════════
         * 
         * PAYLOAD EXPLAINED:
         * - 'action' parameter contains { type, payload }
         * - 'payload' is any data you pass when dispatching
         * 
         * Example dispatch:
         * dispatch(incrementByAmount(5))  → action.payload = 5
         * dispatch(incrementByAmount(10)) → action.payload = 10
         */
        incrementByAmount: (state, action) => {
            // ⬇️ action.payload contains the value passed during dispatch
            state.value += action.payload;
            state.history.push({
                action: `incrementBy(${action.payload})`,
                value: state.value,
                timestamp: new Date().toISOString(),
            });
        },

        /**
         * ════════════════════════════════════════════════════════════════════
         * RESET - Return to initial state
         * ════════════════════════════════════════════════════════════════════
         */
        reset: (state) => {
            state.value = 0;
            state.history = [];
        },

        /**
         * ════════════════════════════════════════════════════════════════════
         * SET INCREMENT AMOUNT
         * ════════════════════════════════════════════════════════════════════
         */
        setIncrementAmount: (state, action) => {
            state.incrementBy = action.payload;
        },

        /**
         * ════════════════════════════════════════════════════════════════════
         * MULTIPLY - Demonstrating complex logic
         * ════════════════════════════════════════════════════════════════════
         */
        multiply: (state, action) => {
            const multiplier = action.payload || 2;
            state.value *= multiplier;
            state.history.push({
                action: `multiply(${multiplier})`,
                value: state.value,
                timestamp: new Date().toISOString(),
            });
        },
    },
});

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 📤 EXPORTS
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * createSlice automatically generates action creators.
 * These are functions that return action objects.
 * 
 * Example:
 * increment() returns { type: 'counter/increment' }
 * incrementByAmount(5) returns { type: 'counter/incrementByAmount', payload: 5 }
 */

// ⬇️ Export individual actions (named exports)
// These are used in components: dispatch(increment())
export const {
    increment,
    decrement,
    incrementByAmount,
    reset,
    setIncrementAmount,
    multiply,
} = counterSlice.actions;

// ⬇️ Export the reducer (default export)
// This is used in store.js: reducer: { counter: counterReducer }
export default counterSlice.reducer;

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 🎯 SELECTORS (Optional but recommended)
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Selectors are functions that extract specific pieces of state.
 * Benefits:
 * 1. Reusable across components
 * 2. Can be memoized for performance
 * 3. Single place to update if state shape changes
 */

// ⬇️ Selector to get counter value
export const selectCount = (state) => state.counter.value;

// ⬇️ Selector to get increment amount
export const selectIncrementAmount = (state) => state.counter.incrementBy;

// ⬇️ Selector to get history
export const selectHistory = (state) => state.counter.history;

// ⬇️ Derived selector - computed value
export const selectIsPositive = (state) => state.counter.value > 0;
