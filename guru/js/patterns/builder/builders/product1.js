class Product1 {
  constructor() {
    this.parts = [];
  }

  listParts() {
    console.log(`Product parts: ${this.parts.join(', ')}\n`);
  }
}
export { Product1 };
