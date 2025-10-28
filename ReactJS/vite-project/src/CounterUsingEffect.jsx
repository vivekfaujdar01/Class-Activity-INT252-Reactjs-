import React, { useState, useEffect } from 'react';  

function CounterUsingEffect() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((prevCount) => prevCount + 1);
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return <div>Count: {count}</div>;
}

export default CounterUsingEffect;
