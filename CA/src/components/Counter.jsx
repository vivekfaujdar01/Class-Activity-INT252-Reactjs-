/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 🔢 COUNTER COMPONENT - Using Redux in React
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * This component demonstrates:
 * 1. useSelector - Reading state from Redux store
 * 2. useDispatch - Sending actions to update state
 * 3. Multiple action types
 * 4. Custom amount handling
 */

import { useState } from 'react';

// ⬇️ Import hooks from react-redux
// These are the ONLY two hooks you need to interact with Redux!
import { useSelector, useDispatch } from 'react-redux';

// ⬇️ Import actions from our slice
import {
  increment,
  decrement,
  incrementByAmount,
  reset,
  multiply,
  selectCount,
  selectIncrementAmount,
  selectHistory,
  selectIsPositive,
} from '../redux/slices/counterSlice';

// ⬇️ Import styles
import styles from './Counter.module.css';

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 🎯 COUNTER COMPONENT
 * ═══════════════════════════════════════════════════════════════════════════
 */
function Counter() {
  // ═══════════════════════════════════════════════════════════════════════
  // LOCAL STATE (Regular React state - for UI only)
  // ═══════════════════════════════════════════════════════════════════════
  const [customAmount, setCustomAmount] = useState(5);
  
  // ═══════════════════════════════════════════════════════════════════════
  // REDUX STATE (useSelector hook)
  // ═══════════════════════════════════════════════════════════════════════
  /**
   * useSelector() HOW IT WORKS:
   * ───────────────────────────
   * 1. It takes a function that receives the entire Redux state
   * 2. You return the specific piece of state you need
   * 3. Component re-renders ONLY when selected value changes
   * 
   * Two ways to use it:
   * 
   * Method 1: Inline selector
   * const value = useSelector(state => state.counter.value);
   * 
   * Method 2: Using exported selectors (RECOMMENDED)
   * const value = useSelector(selectCount);
   */
  
  // ⬇️ Using exported selectors (cleaner and reusable)
  const count = useSelector(selectCount);
  const incrementBy = useSelector(selectIncrementAmount);
  const history = useSelector(selectHistory);
  const isPositive = useSelector(selectIsPositive);
  
  // ⬇️ You can also use inline selectors
  // const count = useSelector(state => state.counter.value);
  
  // ═══════════════════════════════════════════════════════════════════════
  // DISPATCH (useDispatch hook)
  // ═══════════════════════════════════════════════════════════════════════
  /**
   * useDispatch() HOW IT WORKS:
   * ───────────────────────────
   * 1. It returns the dispatch function
   * 2. Call dispatch(action) to send actions to the store
   * 3. The reducer processes the action and updates state
   */
  const dispatch = useDispatch();
  
  // ═══════════════════════════════════════════════════════════════════════
  // EVENT HANDLERS
  // ═══════════════════════════════════════════════════════════════════════
  
  /**
   * Increment the counter by 1
   * dispatch(increment()) sends { type: 'counter/increment' }
   */
  const handleIncrement = () => {
    dispatch(increment());
  };
  
  /**
   * Decrement the counter by 1
   */
  const handleDecrement = () => {
    dispatch(decrement());
  };
  
  /**
   * Increment by a custom amount
   * dispatch(incrementByAmount(5)) sends:
   * { type: 'counter/incrementByAmount', payload: 5 }
   */
  const handleIncrementByAmount = () => {
    dispatch(incrementByAmount(customAmount));
  };
  
  /**
   * Reset the counter to 0
   */
  const handleReset = () => {
    dispatch(reset());
  };
  
  /**
   * Multiply by 2
   */
  const handleMultiply = () => {
    dispatch(multiply(2));
  };
  
  // ═══════════════════════════════════════════════════════════════════════
  // RENDER
  // ═══════════════════════════════════════════════════════════════════════
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>🔢 Redux Counter</h1>
      
      {/* Display the current count */}
      <div className={styles.countDisplay}>
        <span className={`${styles.count} ${isPositive ? styles.positive : styles.negative}`}>
          {count}
        </span>
        <span className={styles.label}>Current Count</span>
      </div>
      
      {/* Basic increment/decrement buttons */}
      <div className={styles.buttonGroup}>
        <button 
          className={`${styles.button} ${styles.primary}`}
          onClick={handleDecrement}
        >
          - Decrement
        </button>
        
        <button 
          className={`${styles.button} ${styles.primary}`}
          onClick={handleIncrement}
        >
          + Increment
        </button>
      </div>
      
      {/* Custom amount input */}
      <div className={styles.customAmountSection}>
        <input
          type="number"
          className={styles.input}
          value={customAmount}
          onChange={(e) => setCustomAmount(Number(e.target.value))}
          placeholder="Enter amount"
        />
        <button 
          className={`${styles.button} ${styles.secondary}`}
          onClick={handleIncrementByAmount}
        >
          Add {customAmount}
        </button>
      </div>
      
      {/* Action buttons */}
      <div className={styles.buttonGroup}>
        <button 
          className={`${styles.button} ${styles.warning}`}
          onClick={handleMultiply}
        >
          × Multiply by 2
        </button>
        
        <button 
          className={`${styles.button} ${styles.danger}`}
          onClick={handleReset}
        >
          ↺ Reset
        </button>
      </div>
      
      {/* History section */}
      <div className={styles.historySection}>
        <h3>📜 Action History</h3>
        {history.length === 0 ? (
          <p className={styles.emptyHistory}>No actions yet. Try the buttons above!</p>
        ) : (
          <ul className={styles.historyList}>
            {history.slice(-5).reverse().map((item, index) => (
              <li key={index} className={styles.historyItem}>
                <span className={styles.historyAction}>{item.action}</span>
                <span className={styles.historyValue}>→ {item.value}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
      
      {/* Debug info */}
      <div className={styles.debugSection}>
        <h4>🐛 Debug Info</h4>
        <pre className={styles.debugPre}>
          {JSON.stringify({ count, incrementBy, historyLength: history.length }, null, 2)}
        </pre>
      </div>
    </div>
  );
}

export default Counter;

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 💡 KEY TAKEAWAYS
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * 1. useSelector(selector) - Read data from Redux store
 *    - Automatically subscribes to store updates
 *    - Re-renders only when selected value changes
 * 
 * 2. useDispatch() - Get the dispatch function
 *    - dispatch(action) sends action to store
 *    - Reducer processes action and updates state
 * 
 * 3. Actions are just objects { type, payload }
 *    - Action creators like increment() generate these
 *    - Payload carries any data needed for the update
 * 
 * 4. Local state vs Redux state:
 *    - Use local state (useState) for UI-only state
 *    - Use Redux for shared/global state
 */
