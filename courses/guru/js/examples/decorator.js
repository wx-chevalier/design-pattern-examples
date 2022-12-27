import {
  ComponentA,
  DecoratorA,
  DecoratorB,
} from '../patterns/decorator';

// works with all objects using Component interface
// this way it can stay independent of concrete classes of components it works with
function clientCode(component) {
  console.log(`RESULT: ${component.operation()}`);
}

/* --- working with simple components --- */

const simpleComponent = new ComponentA();
console.log('Client: Simple component:');
clientCode(simpleComponent);

/* --- working with decorated components --- */

// wrap simple component
const decoratorA = new DecoratorA(simpleComponent);
// wrap decorated component
const decoratorB = new DecoratorB(decoratorA);
console.log('Client: Decorated component:');
clientCode(decoratorB);
