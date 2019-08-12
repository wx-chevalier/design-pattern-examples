import {
  AbstractFactory,
  ConcreteFactory1,
  ConcreteFactory2,
  Tester,
} from './index';

// Abstract factory1
const factory1: AbstractFactory = new ConcreteFactory1();
const tester1: Tester = new Tester(factory1);
tester1.test();

// Abstract factory2
const factory2: AbstractFactory = new ConcreteFactory2();
const tester2: Tester = new Tester(factory2);
tester2.test();
