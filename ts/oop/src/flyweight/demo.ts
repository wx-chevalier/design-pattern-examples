import { ConcreteFlyweight, FlyweightFactory } from './';

const factory: FlyweightFactory = new FlyweightFactory(),
  conc1: ConcreteFlyweight = <ConcreteFlyweight>factory.getFlyweight('conc1'),
  conc2: ConcreteFlyweight = <ConcreteFlyweight>factory.getFlyweight('conc2');

conc1.operation('1');
conc2.operation('2');
