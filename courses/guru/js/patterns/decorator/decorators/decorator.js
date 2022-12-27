// base Decorator class
// follows Components interface
class Decorator {
  constructor(component) {
    // field storing wrapped Component
    this.component = component;
  }

  // delegate all work to wrapped Component
  operation() {
    return this.component.operation();
  }
}

export { Decorator };
