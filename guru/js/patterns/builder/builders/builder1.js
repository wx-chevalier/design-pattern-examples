import { Product1 } from './product1';

// implementation of building steps for concrete builder
class Builder1 {
  // builder instance must have blank product object, which is used in further product assembly
  constructor() {
    this.reset();
  }

  reset() {
    this.product = new Product1();
  }

  // all production steps working with same product instance
  producePartA() {
    this.product.parts.push('PART-A-1');
  }

  producePartB() {
    this.product.parts.push('PART-B-1');
  }

  producePartC() {
    this.product.parts.push('PART-C-1');
  }

  // return result to client and reset for building next product (optionally)
  getProduct() {
    const result = this.product;
    // this is optional: builder can wait for explicit reset call from client before result return
    this.reset();
    return result;
  }
}

export { Builder1 };
