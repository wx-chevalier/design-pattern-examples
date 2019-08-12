import { ConcreteDecorator, ConcreteComponent, Decorator } from './';

const decorator1: Decorator = new ConcreteDecorator(
  1,
  new ConcreteComponent('Comp1')
);

decorator1.operation();
