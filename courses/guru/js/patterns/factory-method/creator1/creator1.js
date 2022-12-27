import { Creator } from '../creator';
import { Product1 } from './product1';

// concrete creator override 'factoryMethod' to change returned product type
class Creator1 extends Creator {
  factoryMethod() {
    return new Product1();
  }
}

export { Creator1 };
