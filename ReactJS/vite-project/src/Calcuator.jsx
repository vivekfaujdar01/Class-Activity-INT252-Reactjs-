import React ,{useReducer} from "react";

function Calculator(){

    const [state, dispatch] = useReducer(
        (state, action) => {
            switch (action.type) {
                case "ADD":
                    return state + action.payload;
                case "SUBTRACT":
                    return state - action.payload;
                case "MULTIPLY":
                    return state * action.payload;
                case "DIVIDE":
                    return state / action.payload;
                case "RESET":
                    return 0;
                default:
                    return state;
            }
        },
        0
    );

    return (
        <div className="m-5 p-5 border-2 border-black  ">
            <h1>Calculator</h1>
            <div>{state}</div>
            <button  className="bg-amber-300 rounded m-2" onClick={() => dispatch({ type: "ADD", payload: 5 })}>+5</button>
            <button className="bg-amber-300 rounded m-2" onClick={() => dispatch({ type: "SUBTRACT", payload: 5 })}>-5</button>
            <button className="bg-amber-300 rounded m-2" onClick={() => dispatch({ type: "MULTIPLY", payload: 2 })}>×2</button>
            <button className="bg-amber-300 rounded m-2" onClick={() => dispatch({ type: "DIVIDE", payload: 2 })}>÷2</button>
            <button className="bg-amber-300 rounded m-2" onClick={() => dispatch({ type: "RESET" })}>Reset</button>
        </div>
    );
}

export default Calculator;