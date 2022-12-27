import { ProductA2, ProductB2 } from '../products';

// produce family of products of type 2
class Factory2 {
  createProductA() {
    return new ProductA2();
  }

  createProductB() {
    return new ProductB2();
  }
}

export { Factory2 };
