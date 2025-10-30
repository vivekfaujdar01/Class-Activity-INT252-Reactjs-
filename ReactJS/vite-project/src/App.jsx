import React from 'react'
import './App.css'
import Home from './component/Home'
import Counter from './component/counter.jsx'
import Stateless from './stateless.jsx'
import EffectHookExample from './EffectHook.jsx'
import ToggleByButton from './ToggleByButton.jsx'
import Stopwatch from './stopwatch.jsx'
function App() {
 
//   const element = React.createElement(
//   'div',                       // parent element type
//   { className: 'parent bg-red-500' },      // props
//   "This is div element",      // child 0
//   React.createElement('h1', {className: 'text-3xl font-bold underline'}, 'Hello'),            // child 1
//   React.createElement('p', {className: 'text-base'}, 'This is a child paragraph.') // child 2
// );
// diffing algorithm is used to compare two versions of a virtual DOM tree and determine the minimum number of changes needed to update the real DOM to match the new virtual DOM.
// reconciliation is the process of updating the real DOM to reflect changes in the virtual DOM after the diffing algorithm has identified what needs to be changed.
// const info = {
//   name: "John Doe",
//   age: 30,
//   occupation: "Software Developer"
// };        
  return (
    <>
      {/* <Home information = {info} />
      {element} */}
      {/* <Counter /> */}
      {/* <Stateless title="Hi" onClick={() => alert('clicked')}>Optional children</Stateless> */}
      {/* <EffectHookExample /> */}
      {/* <ToggleByButton /> */}
      <Stopwatch />
    </>
  )
}

//props drilling is the process of passing data from a parent component to a deeply nested child component through multiple layers of intermediary components via props.
export default App
