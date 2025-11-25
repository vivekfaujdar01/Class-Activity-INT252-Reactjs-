import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// File: CharacterCounter.jsx




/*
File: CharacterCounter.module.css
Place this CSS in the same folder as CharacterCounter.jsx and import it as shown above.
*/

/* container */

/* End of CSS file */


/* Usage example (e.g. in App.jsx)
import React from 'react'
import CharacterCounter from './CharacterCounter'

export default function App(){
  return <div style={{padding:20}}><CharacterCounter maxLength={250} warnThreshold={0.15} /></div>
}
*/
