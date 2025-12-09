import React, { useEffect } from 'react';

export default function useFetch(){

    useEffect(()=>{
        fetch("https://jsonplaceholder.typicode.com/posts/")
        .then((res)=>res.json())
        .then((data)=>console.log(data))
        .catch((err)=>console.error("Error fetching :", err));
    }, []);
}