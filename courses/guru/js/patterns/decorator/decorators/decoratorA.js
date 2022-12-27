import { Decorator } from './decorator';

// concrete Decorator call wrapped object and alter its result in some way
class DecoratorA extends Decorator {
  // concrete Decorator may call parent implementation, instead of call wrapped object directly
  operation() {
    return `DecoratorA: ${super.operation()}`;
  }
}

export { DecoratorA };
