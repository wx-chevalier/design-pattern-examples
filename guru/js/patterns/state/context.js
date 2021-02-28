// define interface of interest of Client
// maintain reference to instance of State subclasses
class Context {
  // reference to Context current state
  #state = null;

  constructor(state) {
    this.transitionTo(state);
  }

  // change State at runtime
  transitionTo(state) {
    console.log(`Context: transition to: ${state.constructor.name}`);
    this.#state = state;
    this.#state.context = this;
  }

  /* --- Context delegates part of its behavior to current State --- */
  request1() {
    this.#state.handle1();
  }

  request2() {
    this.#state.handle2();
  }
}

export { Context };
