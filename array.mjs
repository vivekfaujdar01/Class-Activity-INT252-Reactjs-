// array is a collection of items, which can be of different data types
// arrays are mutable, meaning we can change their elements after creation

const arr1 = [1, 2, 3, 4, 5]; // array of numbers
const arr2 = new Array(3).fill(0); // array of size 3, filled with 0

let str = "hello";
const arr3 = Array.from(str); // array of characters from string

console.log(arr1); // [1, 2, 3, 4, 5]
console.log(arr2); // [0, 0, 0]
console.log(arr3); // ['h', 'e', 'l', 'l', 'o']

// Concatenation
const arr4 = arr1.concat(arr2,arr3);
console.log(arr4); // [1, 2, 3, 4, 5, 0, 0, 0, 'h', 'e', 'l', 'l', 'o']

// every method
const allPositive = arr1.every(num => num > 0);
console.log(allPositive); // true

// some method
const someGreaterThanThree = arr1.some(num => num > 3);
console.log(someGreaterThanThree); // true

// Adding elements
arr1.push(6); // add 6 at the end
arr1.unshift(0); // add 0 at the beginning
console.log(arr1); // [0, 1, 2, 3, 4, 5, 6]

// Removing elements
arr1.pop(); // remove last element
arr1.shift(); // remove first element
console.log(arr1); // [1, 2, 3, 4, 5]

// Slicing
const arr5 = arr1.slice(1, 4); // elements from index 1 to 3
console.log(arr5); // [2, 3, 4]

// Splicing
arr1.splice(2, 1, 'a', 'b'); // at index 2, remove 1 element and add 'a', 'b'
console.log(arr1); // [1, 2, 'a', 'b', 4, 5]

// Iterating
arr1.forEach((item, index) => {
    console.log(`Index: ${index}, Item: ${item}`);
});  // in for each loop we cannot use break or continue statements and return value is undefined (we can't store it in a variable and use it later)

// Mapping
const arr6 = arr1.map(item => item.toString());
console.log(arr6); // ['1', '2', 'a', 'b', '4', '5']

// Filtering
const arr7 = arr1.filter(item => typeof item === 'number');
console.log(arr7); // [1, 2, 4, 5]

// Finding
const foundItem = arr1.find(item => item === 'a');
console.log(foundItem); // 'a'

// Reducing
const sum = arr1.reduce((acc, item) => {      // acc is accumulator, item is current element
    if (typeof item === 'number') {
        return acc + item;
    }
    return acc;
}, 0); // initial value of acc is 0
console.log(sum); // 12 (1 + 2 + 4 + 5)

// Flatten (only works for nested arrays)
const nestedArr = [1, [2, [3, 4]], 5]; 
const flatArr = nestedArr.flat(2); // flattening 2 levels
console.log(flatArr); // [1, 2, 3, 4, 5]

// Joining
const joinedStr = arr1.join('-');
console.log(joinedStr); // "1-2-a-b-4-5"

// Reversing
arr1.reverse();
console.log(arr1); // [5, 4, 'b', 'a', 2, 1]

// Sorting
const arr8 = [3, 1, 4, 2];
arr8.sort((a, b) => a - b); // ascending order
console.log(arr8); // [1, 2, 3, 4]

// Filling
arr8.fill(0, 1, 3); // fill with 0 from index 1 to 2
console.log(arr8); // [1, 0, 0, 4]

// Checking existence
const hasA = arr1.includes('a');
console.log(hasA); // true

// Length of array
console.log(arr1.length); // 6

// index of element
console.log(arr1.indexOf('b')); // 3
console.log(arr1.lastIndexOf(2)); // 1

// Accessing elements
console.log(arr1[0]); // 1
console.log(arr1.at(-1)); // 5 (last element)

export function example() {
    return "This is an example function from array.js";
}

// Note: Arrays in JavaScript are dynamic and can hold elements of different types.