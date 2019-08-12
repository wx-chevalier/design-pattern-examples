import {
  Context,
  ConcreteStrategy1,
  ConcreteStrategy2,
  ConcreteStrategy3,
} from './index';

let context: Context = new Context(new ConcreteStrategy1());

context.executeStrategy();

context = new Context(new ConcreteStrategy2());
context.executeStrategy();

context = new Context(new ConcreteStrategy3());
context.executeStrategy();
