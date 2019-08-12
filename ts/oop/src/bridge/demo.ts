import {
  Abstraction,
  RefinedAbstractionA,
  RefinedAbstractionB,
  ConcreteImplementorA,
  ConcreteImplementorB,
} from './bridge';

const abstractionA: Abstraction = new RefinedAbstractionA(
  new ConcreteImplementorA()
);
const abstractionB: Abstraction = new RefinedAbstractionB(
  new ConcreteImplementorB()
);

abstractionA.callIt('abstractionA');
abstractionB.callIt('abstractionB');
