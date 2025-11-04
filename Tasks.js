function reduce(arr){
    return arr.reduce((acc,val) => val > acc ? val : acc, arr[0]);
}

let numbers = [3, 5, 2, 8, 1];
console.log(reduce(numbers));


function getSquare(arr){
    for(let i=0;i<arr.length;i++){
        if(arr[i]%2 == 0){
            console.log(arr[i] * arr[i] + " ");
        }
    }
}
getSquare(numbers)

function secLargest(arr){
    let max = -1;
    let secMax = -1;
    for(let i = 0;i<arr.length;i++){
        if(arr[i]>max){
            secMax = max;
            max = arr[i];
        }
        else if(arr[i] < max && arr[i] > secMax){
            secMax = arr[i];
        }
    }
    console.log(secMax);
}

secLargest(numbers);


