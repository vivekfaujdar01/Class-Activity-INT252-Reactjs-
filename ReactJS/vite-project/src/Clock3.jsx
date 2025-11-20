import ContextApi from "./ContextApi.jsx";
import { useContext } from "react";

export default function Clock3() {
    const {clock, message3} = useContext(ContextApi);
    return (
        <div className="flex flex-col justify-center items-center bg-blue-400">
            <h1 className="text-4xl font-bold mb-4">Clock Component</h1>
            {
                clock < 16 && <p className="text-lg mb-6">Current Clock: {clock}</p> 
            } 
            {
                clock > 15 && <h2 className="text-2xl font-semibold text-green-700">{message3}</h2>
            }
        </div>
    );
}