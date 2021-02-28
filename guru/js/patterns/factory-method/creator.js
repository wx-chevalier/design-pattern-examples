// this class define methods for all products
class Creator {
  someOperation() {
    const product = this.factoryMethod();
    return `Creator: same creator's code has just worked with ${product.operation()}`;
  }
}

export { Creator };
