import {
  ConcreteElement1,
  ConcreteElement2,
  ConcreteVisitor1,
  ConcreteVisitor2,
  Objs,
} from './';

const objs: Objs = new Objs();

objs.attach(new ConcreteElement1());
objs.attach(new ConcreteElement2());

const v1: ConcreteVisitor1 = new ConcreteVisitor1(),
  v2: ConcreteVisitor2 = new ConcreteVisitor2();

objs.operate(v1);
objs.operate(v2);
