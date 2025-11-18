// import {useEffect, useRef, useState} from "react";

// export default function UseRef() {
    
//     // const reff = useRef(0);
//     // const handler=()=>{
//     //     reff.current=reff.current+1;
//     //     console.log(reff.current);
//     // }
//     // return (
//     //     <>
//     //         <h1 className="">{reff.current}</h1>
//     //         <button className="bg-yellow-300" onClick={handler}>btn</button>
//     //     </>
//     // )

//     // const [count, setCount] = useState(0);
//     const reff = useRef(null);
//     let val = 0;
//     const handler = () => {
//         val = val + 1;
//         count.current.innerText = val;
//         // reff.current.focus();
//         // setCount(count + 1);
//     };

//     const count = useRef(null);

//     // useEffect(() => {
//     //     reff.current = count;
//     // },[count]);
//     return (
//         <>
//             {/* <h1>curret value : {count}</h1>
//             <h1>prev val: {reff.current}</h1>
//             <button onClick={handler} className="bg-amber-300">btn</button> */}
//             {" "}
//             <div className="flex flex-col justify-center items-center h-screen">
//                 <input type="text" ref = {reff} placeholder="type here..." className="border-1 rounded-2xl p-2 m-2" />
//                 <h1 ref={count}>current value:  {val}</h1>
//                 <button onClick = {handler} className="bg-blue-400 font-bold border-2">btn</button>
//             </div>
//         </>
//     )
// }