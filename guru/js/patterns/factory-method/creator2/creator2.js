import { Creator } from '../creator';
import { Product2 } from './product2';

class Creator2 extends Creator {
  factoryMethod() {
    return new Product2();
  }
}

export { Creator2 };
