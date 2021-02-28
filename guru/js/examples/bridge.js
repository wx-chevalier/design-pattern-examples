import {
  Abstraction,
  AbstractionExtended,
  ImplementationA,
  ImplementationB,
} from '../patterns/bridge';

// client code should depend only on Abstraction class
// this way client code can work with any abstraction-implementation combination
function clientCode(abstraction) {
  console.log(abstraction.operation());
}

let implementation = null;
let abstraction = null;

/* --- combination: Abstraction-ImplementationA ---*/
implementation = new ImplementationA();
abstraction = new Abstraction(implementation);
clientCode(abstraction);

/* --- combination: AbstractionExtended-ImplementationB ---*/
implementation = new ImplementationB();
abstraction = new AbstractionExtended(implementation);
clientCode(abstraction);
