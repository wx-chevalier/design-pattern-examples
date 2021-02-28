import { Target, Adaptee, Adapter } from '../patterns/adapter';

// this function supports all classes that follows Target interface
function clientCode(target) {
  console.log(target.request());
}

// call Target method
console.log('Client: can work with Target objects:');
const target = new Target();
clientCode(target);

// call incompatable with Target Adaptee's method
const adaptee = new Adaptee();
console.log('Client: Adaptee has incompatable interface!');
console.log('ADAPTEE: %s', adaptee.incompatableRequest());

// now we can call Adaptee incompatable method via Adapter
console.log('Client: can work with it via Adapter:');
const adapter = new Adapter(adaptee);
clientCode(adapter);
