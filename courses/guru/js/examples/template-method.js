import { Operation1, Operation2 } from '../patterns/template-method';

/* --- client code --- */

function clientCode(operation) {
  // doesn't care about concrete algorithm implementation
  operation.templateMethod();
}

/* --- work with one algoritm implementation --- */

console.log('Same client code can work with different subclasses:');
const operation1 = new Operation1();
clientCode(operation1);

console.log('');

/* --- work with another algoritm implementation --- */

console.log('Same client code can work with different subclasses:');
const operation2 = new Operation2();
clientCode(operation2);
