import { Creator1, Creator2 } from '../patterns/factory-method';

/* --- use creator #1 --- */
console.log('App: launched with Creator1.');
// pick desired creator class
const creator1 = new Creator1();
// do some work with instance of concrete creator
console.log(creator1.someOperation());

/* --- use creator #2 --- */
console.log('App: launched with Creator2.');
// pick desired creator class
const creator2 = new Creator2();
// do some work with instance of concrete creator
console.log(creator2.someOperation());
