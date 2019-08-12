import { AbstractProduct, createProduct } from './index';

const a: AbstractProduct = createProduct('A');
const b: AbstractProduct = createProduct('B');

console.log(a.method());
console.log(b.method());
