import React, { useMemo, useState } from "react";

function Memo(){

    const handler = useMemo(() =>{
        let res = 0;
        console.log("heavy calculation is starting")
        for(let i=0;i<100;i++){
            res++;
            console.log(res);
        }
    },[])
    
    
    const [count, setCount] = useState(0);
    const [toggle, setToggle] = useState(false);

    return(
        <div style={{background: toggle ? 'black' : 'white', color: toggle ? 'white' : 'black'}} >
            <h1>Use of UseMemo</h1>
            <button className="bg-green-400 rounded m-3" onClick={()=>setCount(prev => prev+1)}> Click: {count}</button>
            <button className="bg-amber-500 rounded" onClick={()=>setToggle(!toggle)}>Toggle</button>
            <button onClick={handler} className="bg-blue-400 rounded m-3">Click</button>
        </div>
    )
}

export default Memo;