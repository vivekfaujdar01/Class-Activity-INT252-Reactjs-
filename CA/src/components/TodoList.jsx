/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 📋 TODO LIST COMPONENT - Advanced Redux Example
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * This component demonstrates:
 * 1. CRUD operations with Redux
 * 2. Using multiple selectors
 * 3. Filtered views
 * 4. Conditional rendering based on state
 */

import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// ⬇️ Import all actions and selectors
import {
  addTodo,
  toggleTodo,
  deleteTodo,
  setFilter,
  clearCompleted,
  toggleAll,
  selectFilteredTodos,
  selectFilter,
  selectTodoCount,
  selectActiveCount,
  selectCompletedCount,
  selectAllCompleted,
} from '../redux/slices/todoSlice';

import styles from './TodoList.module.css';

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 🎯 TODO LIST COMPONENT
 * ═══════════════════════════════════════════════════════════════════════════
 */
function TodoList() {
  // ═══════════════════════════════════════════════════════════════════════
  // LOCAL STATE
  // ═══════════════════════════════════════════════════════════════════════
  const [newTodoText, setNewTodoText] = useState('');
  
  // ═══════════════════════════════════════════════════════════════════════
  // REDUX STATE - Using multiple selectors
  // ═══════════════════════════════════════════════════════════════════════
  const filteredTodos = useSelector(selectFilteredTodos);
  const currentFilter = useSelector(selectFilter);
  const totalCount = useSelector(selectTodoCount);
  const activeCount = useSelector(selectActiveCount);
  const completedCount = useSelector(selectCompletedCount);
  const allCompleted = useSelector(selectAllCompleted);
  
  // ═══════════════════════════════════════════════════════════════════════
  // DISPATCH
  // ═══════════════════════════════════════════════════════════════════════
  const dispatch = useDispatch();
  
  // ═══════════════════════════════════════════════════════════════════════
  // EVENT HANDLERS
  // ═══════════════════════════════════════════════════════════════════════
  
  const handleAddTodo = (e) => {
    e.preventDefault();
    if (newTodoText.trim()) {
      // ⬇️ Dispatch addTodo with the text as payload
      dispatch(addTodo(newTodoText.trim()));
      setNewTodoText('');
    }
  };
  
  const handleToggle = (id) => {
    // ⬇️ Dispatch toggleTodo with the ID as payload
    dispatch(toggleTodo(id));
  };
  
  const handleDelete = (id) => {
    // ⬇️ Dispatch deleteTodo with the ID as payload
    dispatch(deleteTodo(id));
  };
  
  const handleFilterChange = (filter) => {
    dispatch(setFilter(filter));
  };
  
  const handleClearCompleted = () => {
    dispatch(clearCompleted());
  };
  
  const handleToggleAll = () => {
    dispatch(toggleAll());
  };
  
  // ═══════════════════════════════════════════════════════════════════════
  // RENDER
  // ═══════════════════════════════════════════════════════════════════════
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>📋 Redux Todo List</h1>
      
      {/* Add Todo Form */}
      <form className={styles.form} onSubmit={handleAddTodo}>
        <input
          type="text"
          className={styles.input}
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
          placeholder="What needs to be done?"
        />
        <button type="submit" className={styles.addButton}>
          Add Todo
        </button>
      </form>
      
      {/* Stats Bar */}
      <div className={styles.statsBar}>
        <span className={styles.stat}>📊 Total: {totalCount}</span>
        <span className={styles.stat}>⏳ Active: {activeCount}</span>
        <span className={styles.stat}>✅ Done: {completedCount}</span>
      </div>
      
      {/* Filter Buttons */}
      <div className={styles.filterBar}>
        {['all', 'active', 'completed'].map((filter) => (
          <button
            key={filter}
            className={`${styles.filterButton} ${currentFilter === filter ? styles.active : ''}`}
            onClick={() => handleFilterChange(filter)}
          >
            {filter.charAt(0).toUpperCase() + filter.slice(1)}
          </button>
        ))}
      </div>
      
      {/* Toggle All & Clear */}
      {totalCount > 0 && (
        <div className={styles.actionBar}>
          <button 
            className={styles.toggleAllButton}
            onClick={handleToggleAll}
          >
            {allCompleted ? '☐ Uncheck All' : '☑ Check All'}
          </button>
          
          {completedCount > 0 && (
            <button 
              className={styles.clearButton}
              onClick={handleClearCompleted}
            >
              🗑️ Clear Completed ({completedCount})
            </button>
          )}
        </div>
      )}
      
      {/* Todo List */}
      <ul className={styles.todoList}>
        {filteredTodos.length === 0 ? (
          <li className={styles.emptyState}>
            {totalCount === 0 
              ? '✨ No todos yet. Add one above!' 
              : '🔍 No todos match the current filter.'}
          </li>
        ) : (
          filteredTodos.map((todo) => (
            <li 
              key={todo.id} 
              className={`${styles.todoItem} ${todo.completed ? styles.completed : ''}`}
            >
              <input
                type="checkbox"
                className={styles.checkbox}
                checked={todo.completed}
                onChange={() => handleToggle(todo.id)}
              />
              <span className={styles.todoText}>{todo.text}</span>
              <button
                className={styles.deleteButton}
                onClick={() => handleDelete(todo.id)}
              >
                ✕
              </button>
            </li>
          ))
        )}
      </ul>
      
      {/* How it works section */}
      <div className={styles.infoBox}>
        <h3>🧠 How This Uses Redux:</h3>
        <ul>
          <li><strong>addTodo:</strong> Adds new item to state.todos.items array</li>
          <li><strong>toggleTodo:</strong> Finds todo by ID and toggles completed</li>
          <li><strong>deleteTodo:</strong> Filters out the todo from array</li>
          <li><strong>setFilter:</strong> Updates state.todos.filter</li>
          <li><strong>Selectors:</strong> Compute filtered list from state</li>
        </ul>
      </div>
    </div>
  );
}

export default TodoList;
