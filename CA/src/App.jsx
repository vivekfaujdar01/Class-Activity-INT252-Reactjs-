/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 🎯 APP COMPONENT - Redux Learning Examples
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * This app demonstrates Redux concepts with two examples:
 * 1. Counter - Simple state management
 * 2. TodoList - CRUD operations with Redux
 * 
 * UNDERSTANDING REDUX IN THIS APP:
 * ────────────────────────────────
 * - Both Counter and TodoList share the SAME Redux store
 * - Each has its own "slice" of state
 * - They can access each other's state if needed
 * - State persists as you switch between components
 */

import { useState } from 'react';
import Counter from './components/Counter';
import TodoList from './components/TodoList';
import './App.css';

function App() {
  // ⬇️ Local state for tab switching (this is UI state, not Redux)
  const [activeTab, setActiveTab] = useState('counter');

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <h1>🎓 Redux Learning Hub</h1>
        <p>Understand Redux with practical examples</p>
      </header>

      {/* Tab Navigation */}
      <nav className="tabs">
        <button
          className={`tab ${activeTab === 'counter' ? 'active' : ''}`}
          onClick={() => setActiveTab('counter')}
        >
          🔢 Counter Example
        </button>
        <button
          className={`tab ${activeTab === 'todo' ? 'active' : ''}`}
          onClick={() => setActiveTab('todo')}
        >
          📋 Todo Example
        </button>
        <button
          className={`tab ${activeTab === 'learn' ? 'active' : ''}`}
          onClick={() => setActiveTab('learn')}
        >
          📚 Learn Redux
        </button>
      </nav>

      {/* Content */}
      <main className="content">
        {activeTab === 'counter' && <Counter />}
        {activeTab === 'todo' && <TodoList />}
        {activeTab === 'learn' && <LearnRedux />}
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>💡 Tip: Open Redux DevTools in browser to see state changes!</p>
      </footer>
    </div>
  );
}

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 📚 LEARN REDUX COMPONENT
 * ═══════════════════════════════════════════════════════════════════════════
 */
function LearnRedux() {
  return (
    <div className="learn-container">
      <h2>📚 Redux Concepts Explained</h2>
      
      <section className="concept-card">
        <h3>1️⃣ Store</h3>
        <p>The <strong>store</strong> is a single JavaScript object that holds your entire app's state.</p>
        <pre>{`// Our store structure:
{
  counter: { value: 0, history: [] },
  todos: { items: [], filter: 'all' }
}`}</pre>
      </section>

      <section className="concept-card">
        <h3>2️⃣ Actions</h3>
        <p><strong>Actions</strong> are objects that describe what happened. They have a type and optional payload.</p>
        <pre>{`// Action examples:
{ type: 'counter/increment' }
{ type: 'todos/addTodo', payload: 'Learn Redux' }`}</pre>
      </section>

      <section className="concept-card">
        <h3>3️⃣ Reducers</h3>
        <p><strong>Reducers</strong> are pure functions that take the current state + action and return new state.</p>
        <pre>{`// Reducer example:
function counterReducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { ...state, value: state.value + 1 };
    default:
      return state;
  }
}`}</pre>
      </section>

      <section className="concept-card">
        <h3>4️⃣ useSelector</h3>
        <p><strong>useSelector</strong> hook extracts data from the Redux store.</p>
        <pre>{`// Reading state:
const count = useSelector(state => state.counter.value);
const todos = useSelector(state => state.todos.items);`}</pre>
      </section>

      <section className="concept-card">
        <h3>5️⃣ useDispatch</h3>
        <p><strong>useDispatch</strong> returns the dispatch function to send actions.</p>
        <pre>{`// Dispatching actions:
const dispatch = useDispatch();
dispatch(increment());
dispatch(addTodo('New task'));`}</pre>
      </section>

      <section className="concept-card highlight">
        <h3>🔄 Redux Data Flow</h3>
        <pre className="flow">{`
┌──────────────────────────────────────────────────────┐
│                                                      │
│   User clicks button                                 │
│         │                                            │
│         ▼                                            │
│   Component calls dispatch(action)                   │
│         │                                            │
│         ▼                                            │
│   Reducer receives (currentState, action)            │
│         │                                            │
│         ▼                                            │
│   Reducer returns NEW state                          │
│         │                                            │
│         ▼                                            │
│   Store updates                                      │
│         │                                            │
│         ▼                                            │
│   useSelector triggers re-render                     │
│         │                                            │
│         ▼                                            │
│   UI displays new data                               │
│                                                      │
└──────────────────────────────────────────────────────┘
`}</pre>
      </section>

      <section className="files-section">
        <h3>📁 Files to Study</h3>
        <ul>
          <li><strong>src/redux/store.js</strong> - Store configuration</li>
          <li><strong>src/redux/slices/counterSlice.js</strong> - Counter slice with actions & reducers</li>
          <li><strong>src/redux/slices/todoSlice.js</strong> - Todo CRUD operations</li>
          <li><strong>src/components/Counter.jsx</strong> - Using Redux in components</li>
          <li><strong>src/components/TodoList.jsx</strong> - Advanced Redux usage</li>
          <li><strong>src/redux/REDUX_TUTORIAL.md</strong> - Complete tutorial</li>
        </ul>
      </section>
    </div>
  );
}

export default App;