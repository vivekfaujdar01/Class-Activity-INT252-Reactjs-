import React, { useEffect } from 'react';
import axios from 'axios';

export default function Fetching(){
  useEffect(() => {
    // fetch("https://jsonplaceholder.typicode.com/posts/")
    //   .then((response) => response.json())
    //   .then((data) => console.log(data))
    //   .catch((error) => console.error("Error fetching data:", error));

    axios.get("https://jsonplaceholder.typicode.com/posts/")
    .then((res)=> console.log(res.data)).
    catch((err)=> console.error("Error fetching data using axios :", err));
  }, []);


  // Syntax for fetching data using async/await
  //     fetch('https://api.example.com/users', {
  //        method: 'POST',
  //        headers: {
  //            'Content-Type': 'application/json'
  //        },
  //         body: JSON.stringify({
  //            name: "",
  //            email: ""
  //        })
  //      })

//   POST using Fetch()
//   fetch("https://api.example.com/users", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       name: "Vivek",
//       email: "vivek@example.com",
//     }),
//   })
//     .then((response) => response.json())
//     .then((data) => console.log(data))
//     .catch((err) => console.error(err));

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Fetching Component</h1>
      <p>Check the console for fetched data.</p>
    </div>
  );
}