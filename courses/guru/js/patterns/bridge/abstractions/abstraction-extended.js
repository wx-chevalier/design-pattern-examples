import { Abstraction } from './abstraction';

// Abstraction extended without any change in Implementation classes
class AbstractionExtended extends Abstraction {
  operation() {
    const result = this.implementation.implementationOperation();
    return `Abstraction Extended: Extended operation with: ${result}`;
  }
}

export { AbstractionExtended };
