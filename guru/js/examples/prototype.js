import { Prototype, Component } from '../patterns/prototype';

// create object
const p1 = new Prototype();
p1.primitive = 245;
p1.component = new Date();
p1.circularReference = new Component(p1);

// clone object
const p2 = p1.clone();

// check: are objects totally equal?
// must return false
console.log(p1 === p2);

// checks: is object p1 is full clone of object p2?
// all checks must return 'OK...'
if (p1.primitive === p2.primitive) {
  console.log('OK: primitive field values have been cloned.');
} else {
  console.log('FAIL: primitive field values have not been copied.');
}

if (p1.component === p2.component) {
  console.log('OK: simple component has been cloned.');
} else {
  console.log('FAIL: simple component has not been cloned.');
}

if (p1.circularReference === p2.circularReference) {
  console.log('OK: component with back reference has been cloned.');
} else {
  console.log('FAIL: component with back reference has not been cloned.');
}

if (p1.circularReference.prototype === p2.circularReference.prototype) {
  console.log('OK: component with back reference is linked to clone.');
} else {
  console.log('FAIL: component with back reference is linked to original object.');
}
