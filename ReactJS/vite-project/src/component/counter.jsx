// import { Component } from "react";
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount((prev) => prev + 1);
  };

  const decrement = () => {
    if (count === 0) return;
    setCount((prev)=> prev - 1);
  };

  return (
    <div className="text-center mt-10">
      <h1 className="text-4xl font-bold mb-4">Counter: {count}</h1>
      <button
        className="bg-blue-500 text-white px-4 py-2 mr-2 rounded"
        onClick={increment}
      >
        Increment
      </button>
      <button
        className="bg-red-500 text-white px-4 py-2 rounded"
        onClick={decrement}
      >
        Decrement
      </button>
    </div>
  );
} 

export default Counter;

// class Counter extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       count: 0,
//     };
//   }

//   increment = () => {
//     this.setState({ count: this.state.count + 1 });
//   };

//   decrement = () => {
//     if(this.state.count === 0) return;
//     this.setState({ count: this.state.count - 1 });
//   };

//   render() {
//     return (
//       <div className="text-center mt-10">
//         <h1 className="text-4xl font-bold mb-4">Counter: {this.state.count}</h1>
//         <button
//           className="bg-blue-500 text-white px-4 py-2 mr-2 rounded"
//           onClick={this.increment}
//         >
//           Increment
//         </button>
//         <button
//           className="bg-red-500 text-white px-4 py-2 rounded"
//           onClick={this.decrement}
//         >
//           Decrement
//         </button>
//       </div>
//     );
//   }
// }

