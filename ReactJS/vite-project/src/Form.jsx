import React,{useState} from 'react';

export default function Form(){
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const handleSubmit = (e) => {
      e.preventDefault();
      console.log({ name, email });
    };

    return (
      <form onSubmit={handleSubmit} className='flex flex-col p-2'>
        <label>
          Name : 
          <input
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className='border p-2 m-2'
          />
        </label>

        <label>
          Email :
          <input
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            type="email"
            className='border p-2 m-2'
          />
        </label>

        <button type="submit">Submit</button>
      </form>
    );
}