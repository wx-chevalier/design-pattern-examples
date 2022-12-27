// product factory
class ProductB2 {
  // products of family B must implement this method
  productBMethod() {
    return 'Product B2';
  }

  // and method collaborating with product A2
  productBMethod2(collaborator) {
    const result = collaborator.productAMethod();
    return `Product B2 collaborating with ${result}`;
  }
}

export { ProductB2 };
