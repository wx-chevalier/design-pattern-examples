import { Operation } from './operation';

// override some operations with own implementation
class Operation1 extends Operation {
  requredOperation1() {
    console.log('Operation1: do required operation 1');
  }

  requredOperation2() {
    console.log('Operation1: do required operation 2');
  }
}

export { Operation1 };
