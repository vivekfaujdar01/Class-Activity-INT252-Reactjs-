// we have to generate random quotes from an array of quotes
import React, { useState } from 'react';

const quotes = [
  "The best way to predict the future is to invent it. - Alan Kay",
  "Life is 10% what happens to us and 90% how we react to it. - Charles R. Swindoll",
  "The only way to do great work is to love what you do. - Steve Jobs",
  "Success is not the key to happiness. Happiness is the key to success. - Albert Schweitzer",
  "In the middle of every difficulty lies opportunity. - Albert Einstein"
];

function Quote() {
  const [currentQuote, setCurrentQuote] = useState("");

  const generateQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setCurrentQuote(quotes[randomIndex]);
  };

  return (
    <div>
      <h1 className='p-2'>Random Quote Generator</h1>
      <button onClick={generateQuote} className="bg-red-500 text-white px-4 py-2 rounded">Generate Quote</button>
      <p>{currentQuote}</p>
    </div>
  );
}

export default Quote;