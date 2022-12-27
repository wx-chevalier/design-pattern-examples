import {
  Component1,
  Component2,
  Visitor1,
  Visitor2,
} from '../patterns/visitor';

// client code can run operations on any set of elements without figuring out their concrete classes
function clientCode(components, visitor) {
  components.forEach((component) => {
    component.accept(visitor);
  });
}

// create components
const components = [
  new Component1(),
  new Component2(),
];

/* --- use one Visitor --- */

console.log('Client code works with all visitors using Visitor interface:');
const visitor1 = new Visitor1();
clientCode(components, visitor1);

console.log('');

/* --- use another Visitor --- */

console.log('Same client can work with another Visitor:');
const visitor2 = new Visitor2();
clientCode(components, visitor2);
