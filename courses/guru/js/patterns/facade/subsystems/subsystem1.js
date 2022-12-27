// this class can accept requests either from Facade or client directly
// for this class Facade is just another client
class Subsystem1 {
  // some operation
  operation1() {
    return 'Subsystem1: Ready!\n';
  }

  operationN() {
    return 'Subsystem1: Go!\n';
  }
}

export { Subsystem1 };
