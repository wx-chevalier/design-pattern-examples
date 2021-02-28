import { ProductFactory } from '../patterns/simple-factory';

/* --- make product #1 --- */
const product1 = ProductFactory.makeProduct('property-A-1', 'property-B-1');
console.log('Product #1: property #1: %s', product1.getProp1());
console.log('Product #1: property #2: %s', product1.getProp2());

/* --- make product #2 --- */
const product2 = ProductFactory.makeProduct('property-A-2', 'property-B-2');
console.log('Product #2: property #1: %s', product2.getProp1());
console.log('Product #2: property #2: %s', product2.getProp2());
