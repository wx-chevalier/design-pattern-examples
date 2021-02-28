// this class can accept requests either from Facade or client directly
// for this class Facade is just another client
class Subsystem2 {
  // some operation
  operation1() {
    return 'Subsystem2: Ready!\n';
  }

  operationZ() {
    return 'Subsystem2: Go!\n';
  }
}

export { Subsystem2 };
