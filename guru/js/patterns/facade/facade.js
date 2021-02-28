import { Subsystem1, Subsystem2 } from './subsystems';

// provides simple interface to complex logic of one or many subsystems
// delegates client requests to appropriate objects within subsystem
class Facade {
  // Facade can be provided with existing subsystem objects or be forced to create its own
  constructor(subsystem1, subsystem2) {
    this.subsystem1 = subsystem1 || new Subsystem1();
    this.subsystem2 = subsystem2 || new Subsystem2();
  }

  // this method is shortcut to subsystems functionality
  // i.e. it "hides" some complexity behind simple interface
  operation() {
    let result = 'Facade initializes subsystems\n';
    result += this.subsystem1.operation1();
    result += this.subsystem2.operation1();
    result += 'Facade orders subsytems to perform action:\n';
    result += this.subsystem1.operationN();
    result += this.subsystem2.operationZ();
    return result;
  }
}

export { Facade };
