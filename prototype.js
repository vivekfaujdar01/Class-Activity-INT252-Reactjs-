class person{
    constructor(name,age){
        this.name=name;
        this.age=age;
    }
}

person.prototype.stu = class student{
    constructor(name,age,sec){
        person.call(this,name,age);
        this.sec=sec;
    }
    details(){
        console.log(`Name: ${this.name}, Age: ${this.age}, Section: ${this.sec}`);
    }
}

person.prototype.emp = class employee{
    constructor(name,age,dept){
        person.call(this,name,age);
        this.dept=dept;
    }
    details(){
        console.log(`Name: ${this.name}, Age: ${this.age}, Department: ${this.dept}`);
    }
}

console.log("Person Class :",person);
console.log("Student Class :",person.prototype.stu);
console.log("Employee Class :",person.prototype.emp);

//In JavaScript, prototype is an object that is associated with every function and object by default. It is used to implement inheritance. When you create a function (which can be used as a constructor), JavaScript automatically creates a prototype property for that function.

// All instances created from a constructor function inherit properties and methods from the constructor’s prototype.
// If you try to access a property or method on an object and it’s not found, JavaScript looks for it in the object’s prototype chain.
//In summary:
// The prototype is a mechanism by which JavaScript objects inherit features from one another.