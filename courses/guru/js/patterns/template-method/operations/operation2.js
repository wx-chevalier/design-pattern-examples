import { Operation } from './operation';

// override some operations with own implementation
class Operation2 extends Operation {
  requredOperation1() {
    console.log('Operation2: do required operation 1');
  }

  requredOperation2() {
    console.log('Operation2: do required operation 2');
  }

  hook1() {
    console.log('Opearation2: hook 1');
  }
}

export { Operation2 };
