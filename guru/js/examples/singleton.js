import { Singleton } from '../patterns/singleton';

// create object #1 with new
const singleton1 = new Singleton();
console.log(singleton1);

// create object #2 with new
const singleton2 = new Singleton();
console.log(singleton2);

// check: are they totally equal?
// must be true
console.log(singleton1 === singleton2);

// create object #3 with method
const singleton3 = Singleton.getInstance();
console.log(singleton3);

// create object #4 with method
const singleton4 = Singleton.getInstance();
console.log(singleton4);

// check: are they totally equal?
// must be true
console.log(singleton3 === singleton4);

// check: is object instance of Singleton
// must be true
console.log(singleton1 instanceof Singleton);
console.log(singleton3 instanceof Singleton);

// read object property
// must return property value
console.log(singleton1.password);

// check: direct access to instance
// must be undefined
console.log(Singleton.instance);

// check: direct access to private data
// must be undefined
console.log(Singleton.privateObject);
