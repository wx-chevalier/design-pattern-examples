import { Factory1, Factory2 } from '../patterns/abstract-factory';

/* --- create products of type 1 --- */

// use concrete factory
let factory = new Factory1();
// create product of family A
let productA = factory.createProductA();
// create product of family B
let productB = factory.createProductB();

// call product A method
console.log('Factory #1: %s', productA.productAMethod());
// call product B method
console.log('Factory #1: %s', productB.productBMethod());

/* --- create products of type 2 --- */

// use concrete factory
factory = new Factory2();
// create product of family A
productA = factory.createProductA();
// create product of family B
productB = factory.createProductB();

// call product A method
console.log('Factory #2: %s', productA.productAMethod());
// call product B method collaborating with product of family A
console.log('Factory #2: %s', productB.productBMethod2(productA));
