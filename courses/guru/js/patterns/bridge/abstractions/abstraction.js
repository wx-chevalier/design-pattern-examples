// interface for "control" of two class hierarchies
// typically abstraction perform high-level operations

// maintains reference to object of Implementation hierarchy
// and delegates all real work to this object
class Abstraction {
  constructor(implementation) {
    this.implementation = implementation;
  }

  operation() {
    const result = this.implementation.implementationOperation();
    return `Abstraction: Base operation with: ${result}`;
  }
}

export { Abstraction };
