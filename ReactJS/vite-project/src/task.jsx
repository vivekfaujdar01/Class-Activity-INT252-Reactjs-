import { useState, useEffect } from "react";
// we will make a button on click it after 5 seconds it will disappear and show message that it disappears

function Task() {
    // const [showButton, setShowButton] = useState(true);
    // const [message, setMessage] = useState("");

    // const handleClick = () => {
    //     setTimeout(() => {
    //         setMessage("The button disappeared after 5 seconds");
    //         setShowButton(false);
    //     },5000)
    // };

    // return(
    //     <>
    //         {showButton ? (<button onClick={handleClick} className="text-3xl text-amber-300 bg-blue-500">Click me</button>) : (<p>{message}</p>)}
    //     </>
    // )

    const [disabled , setDisabled] = useState(false);
    const [clicked, setClicked] = useState(false);

    useEffect(() => {
        let timer;
        if(clicked) {
            timer = setTimeout(() => {
                setDisabled(true);
            }, 5000);
            
            return () => clearTimeout(timer);
        }
    }, [clicked]);

    return (
        <button onClick={() => setClicked(true)} disabled={disabled}>
            Click me
        </button>
    );
}

export default Task;