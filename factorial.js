function factorial(n){
    fact = 1;
    while(n>0){
        fact = fact * n;
        n--;
    }
    return fact;
}
let ans = factorial(6);
console.log(ans);