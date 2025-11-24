import React, { useRef,useState, useEffect } from "react";
// USE CASE 1: Accessing DOM Elements (Most Common)
// Example: Automatically focus on an input box when the page loads

// export default function UseRef() {
//   const inputRef = useRef(null);

//   useEffect(() => {
//     inputRef.current.focus();   // Access DOM element
//   }, []);

//   return (
//     <div>
//       <h2>Auto Focus Input</h2>
//       <input ref={inputRef} type="text" placeholder="Type here..." />
//     </div>
//   );
// }

// USE CASE 2: Storing Values Without Re-rendering
// Example: A counter that updates internally without causing UI updates.

    // export default function UseRef() {
    //   const countRef = useRef(0);
    //   const [renderCount, setRenderCount] = useState(0);

    //   const increase = () => {
    //     countRef.current++;
    //     console.log("Count:", countRef.current);
    //   };

    //   return (
    //     <div>
    //       <h2>useRef Counter</h2>
    //       <p>Render Count: {renderCount}</p>

    //       <button onClick={increase} className="bg-blue-300 m-3">Increase ref Counter</button>

    //       <button onClick={() => setRenderCount(e => e + 1)} className="bg-green-300">
    //         Rerender Component
    //       </button>
    //     </div>
    //   );
    // }

// USE CASE 3: Storing Previous Value
// Example: Show previous state vs current state.

// /

// USE CASE 4: Managing Timers (setInterval / setTimeout)

export default function UseRef() {
  const timerRef = useRef(null);

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      console.log("Timer running...");
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(timerRef.current);
  };

  return (
    <div>
      <h2>Timer with useRef</h2>
      <button onClick={startTimer}>Start</button>
      <button onClick={stopTimer}>Stop</button>
    </div>
  );
}
