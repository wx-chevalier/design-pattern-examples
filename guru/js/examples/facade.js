import { Facade, Subsystem1, Subsystem2 } from '../patterns/facade';

// client code works with complex subsystems through simple Facade interface
function clientCode(facade) {
  console.log(facade.operation());
}

/* --- manual subsystems initialization --- */
const subsystem1 = new Subsystem1();
const subsystem2 = new Subsystem2();
const facade1 = new Facade(subsystem1, subsystem2);
clientCode(facade1);

/* --- Facade itself creates subsystem instances --- */
const facade2 = new Facade();
clientCode(facade2);
