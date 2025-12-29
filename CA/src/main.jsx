/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 🚀 MAIN.JSX - Application Entry Point
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * This is where we CONNECT React to Redux using the Provider component.
 * 
 * PROVIDER EXPLAINED:
 * ───────────────────
 * The Provider component from 'react-redux' makes the Redux store available
 * to all components in your app. It uses React Context internally.
 * 
 * Without Provider: Components can't access the store
 * With Provider: Any component can use useSelector/useDispatch
 * 
 * STRUCTURE:
 * ──────────
 * <Provider store={store}>     ← Makes store available
 *   <App />                    ← Your entire app
 * </Provider>
 */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

// ⬇️ Import Provider from react-redux
// Provider is the bridge between React and Redux
import { Provider } from 'react-redux';

// ⬇️ Import our configured store
import store from './redux/store';

// ⬇️ Import the main App component
import App from './App.jsx';

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 🎯 RENDER THE APP
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * CRITICAL: Provider must wrap your entire app!
 * 
 * If you wrap only part of your app, only that part can access Redux.
 */
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* ⬇️ Provider wraps the entire app and passes the store */}
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
);

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 💡 KEY POINTS TO REMEMBER
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * 1. Provider MUST be at the top level (wrapping everything)
 * 2. Pass the store to Provider via the 'store' prop
 * 3. Now ANY child component can use useSelector and useDispatch
 * 4. Only ONE Provider is typically needed per app
 * 
 * If Provider is missing, you'll get this error:
 * "could not find react-redux context value; please ensure the component
 * is wrapped in a <Provider>"
 */
