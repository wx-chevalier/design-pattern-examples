import { Product } from './product';

// product factory: make product and return it
class ProductFactory {
  static makeProduct(prop1, prop2) {
    return new Product(prop1, prop2);
  }
}

export { ProductFactory };
