import ContextApi from "./ContextApi.jsx";
import { useContext } from "react";

export default function Clock1() {
    const {clock, message1} = useContext(ContextApi);
    return (
        <div className="flex flex-col justify-center items-center bg-red-400">
            <h1 className="text-4xl font-bold mb-4">Clock Component</h1>
            {
                clock < 16 && <p className="text-lg mb-6">Current Clock: {clock}</p> 
            }
             
            {
                clock > 5 && <h2 className="text-2xl font-semibold text-green-700">{message1}</h2>
            }
            
        </div>
    );
}