// reference to connected Mediator
let privateMediator = null;

// provides basic functionality of saving Mediator instances inside Component objects
class Component {
  constructor(mediator) {
    privateMediator = mediator;
  }

  get mediator() {
    return privateMediator;
  }

  set mediator(mediator) {
    privateMediator = mediator;
  }
}

export { Component };
