import { Numbers, ConcreteIterator } from './index';

const nArray = [1, 7, 21, 657, 3, 2, 765, 13, 65],
  numbers: Numbers = new Numbers(nArray),
  it: ConcreteIterator = <ConcreteIterator>numbers.createIterator();

while (it.hasNext()) {
  console.log(it.next());
}
