// product factory
class ProductB1 {
  // products of family B must implement this method
  productBMethod() {
    return 'Product B1';
  }

  // and method collaborating with product A1
  productBMethod2(collaborator) {
    const result = collaborator.productAMethod();
    return `Product B1 collaborating with ${result}`;
  }
}

export { ProductB1 };
