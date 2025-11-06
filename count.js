// count vowels in a string and 
function count() {
    let str = "Hello World 123 4567 89";
    let count = 0;
    for (let i = 0; i < str.length; i++) {
        if ("aeiouAEIOU".includes(str[i])) {
            count++;
        }
    }
    console.log("Number of vowels:", count);
}
count();

//find the longest consecutive sequence of numbers in a unsorted array
function longestConsecutive() {
    let arr = [100, 4, 200, 1, 3, 2];

    arr.sort((a, b) => a - b);
    let longest = 1;
    let count = 1;
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] === arr[i - 1]) continue;
        if (arr[i] === arr[i - 1] + 1) {
            count++;
        } else {
            longest = Math.max(longest, count);
            count = 1;
        }
    }
    longest = Math.max(longest, count);
    console.log("Longest consecutive sequence:", longest);
}
longestConsecutive();

// findout all unique words using hashset 
function unique(){
    let str = "ll Word ll";
    let words = str.split(" ");
    let uniqueWords = new Set(words);
    console.log("Unique words:", uniqueWords);
}
unique();

// count frequency of each word using hashmap
function Frequency(){
    let str = "ll World ll";
    let words = str.split(" ");
    let frequencyMap = new Map();
    for (let word of words) {
        frequencyMap.set(word, (frequencyMap.get(word) || 0) + 1);
    }
    console.log("Word frequency:", frequencyMap);
}
Frequency();