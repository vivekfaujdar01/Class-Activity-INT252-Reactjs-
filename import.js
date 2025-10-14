import { example } from "./array.mjs";
// console.log(example());

//In JavaScript modules, all top-level code in array.mjs runs when you import it, not just the code inside the example() function. This is the standard behavior for ES modules.

// How to fix:
// Make sure that only function and variable declarations (not executable code) are at the top level of array.mjs.
// If you have code that should only run when example() is called, put it inside the function.


// destructuring
const arr1 = [1, 2, 'a', 'b', 4, 5];
const [first, second, ...rest] = arr1;
console.log(first); // 1
console.log(second); // 2
console.log(rest); // ['a', 'b', 4, 5]

// Spread operator
const arr2 = [6, 7, 8];
const combinedArr = [...arr1, ...arr2];
console.log(combinedArr); // [1, 2, 'a', 'b', 4, 5, 6, 7, 8]

const obj1 = { name: 'Alice', age: 25 };
const obj2 = { city: 'New York', country: 'USA' };
const combinedObj = { ...obj1, ...obj2 };
console.log(combinedObj); // { name: 'Alice', age: 25, city: 'New York', country: 'USA' }

// Rest parameters
// The rest operator (...) in JavaScript is used in function parameters to collect all remaining arguments into a single array.

function sumAll(...numbers) {
    return numbers.reduce((acc, num) => acc + num, 0);
}
console.log(sumAll(1, 2, 3)); // 6
console.log(sumAll(4, 5, 6, 7, 8)); // 30

// Note: The spread operator (...) expands an array or object into individual elements/properties, while rest parameters collect multiple elements into a single array parameter in function definitions.