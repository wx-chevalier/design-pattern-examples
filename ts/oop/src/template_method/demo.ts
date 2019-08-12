import { ConcreteClass1, ConcreteClass2 } from './index';

const c1: ConcreteClass1 = new ConcreteClass1(),
  c2: ConcreteClass2 = new ConcreteClass2();

c1.templateMethod();
c2.templateMethod();
