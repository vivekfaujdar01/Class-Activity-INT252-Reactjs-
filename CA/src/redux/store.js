/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 📦 REDUX STORE - The Central State Container
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * WHAT IS A STORE?
 * ────────────────
 * The store is like a "database" for your frontend application.
 * It holds the complete state tree of your app in one place.
 * 
 * KEY POINTS:
 * ───────────
 * 1. There is only ONE store in a Redux app (Single Source of Truth)
 * 2. The store is READ-ONLY - you can only change it via actions
 * 3. All components can access the store via Provider
 * 
 * ANALOGY:
 * ────────
 * Think of the store as a Bank's Vault:
 * - You can't directly modify the money inside
 * - You must fill a form (action) and give to teller (dispatch)
 * - The teller processes (reducer) and updates the vault
 */

// ⬇️ Import configureStore from Redux Toolkit
// This is the MODERN way to create a Redux store
import { configureStore } from '@reduxjs/toolkit';

// ⬇️ Import our slice reducers
// Each slice handles one part of the state
import counterReducer from './slices/counterSlice';
import todoReducer from './slices/todoSlice';

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 🏪 CREATE THE STORE
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * configureStore() does several things automatically:
 * 1. Combines all reducers
 * 2. Adds Redux DevTools support
 * 3. Adds middleware (like redux-thunk for async)
 * 4. Enables Redux immutability checks in development
 */
const store = configureStore({
    // ⬇️ The 'reducer' object defines the shape of our state
    // Each key becomes a property in the state
    reducer: {
        // state.counter will be managed by counterReducer
        counter: counterReducer,

        // state.todos will be managed by todoReducer
        todos: todoReducer,
    },

    // ⬇️ Optional: Enable Redux DevTools in development
    devTools: import.meta.env.MODE !== 'production',
});

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 📊 RESULTING STATE STRUCTURE
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * After configuring, our store's state looks like:
 * 
 * {
 *   counter: {
 *     value: 0
 *   },
 *   todos: {
 *     items: [],
 *     filter: 'all'
 *   }
 * }
 * 
 * You can access these using:
 * - useSelector(state => state.counter.value)
 * - useSelector(state => state.todos.items)
 */

// ⬇️ Export the store as default
// This will be imported in main.jsx to wrap the app
export default store;

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 💡 DEBUGGING TIP
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Install Redux DevTools browser extension to:
 * - See the current state
 * - Track all dispatched actions
 * - Time-travel to previous states
 * - Export/import state for debugging
 * 
 * Chrome: https://chrome.google.com/webstore/detail/redux-devtools
 * Firefox: https://addons.mozilla.org/en-US/firefox/addon/reduxdevtools
 */
