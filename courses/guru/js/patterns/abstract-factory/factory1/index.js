import { ProductA1, ProductB1 } from '../products';

// produce family of products of type 1
class Factory1 {
  createProductA() {
    return new ProductA1();
  }

  createProductB() {
    return new ProductB1();
  }
}

export { Factory1 };
