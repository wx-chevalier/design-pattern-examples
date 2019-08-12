import {
  Handler,
  ConcreteHandler1,
  ConcreteHandler2,
  ConcreteHandler3,
} from './index';

let h1: Handler,
  h2: Handler,
  h3: Handler,
  reqs: number[],
  i: number,
  max: number;

reqs = [2, 7, 23, 34, 4, 5, 8, 3];

h1 = new ConcreteHandler1(3);
h2 = new ConcreteHandler2(7);
h3 = new ConcreteHandler3(20);

h1.setHandler(h2);
h2.setHandler(h3);

for (i = 0, max = reqs.length; i < max; i += 1) {
  h1.operation('operation is fired!', reqs[i]);
}
