// optional class. just used to build some predefined products
class Director {
  // set specific builder
  setBuilder(builder) {
    this.builder = builder;
  }

  // some predefined product
  buildMinimalProduct() {
    this.builder.producePartA();
  }

  // some predefined product
  buildFullProduct() {
    this.builder.producePartA();
    this.builder.producePartB();
    this.builder.producePartC();
  }
}

export { Director };
