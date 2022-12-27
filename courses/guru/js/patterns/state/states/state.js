// base class for managing backreference to Context associated with State
class State {
  #context = null;

  static get context() {
    return this.#context;
  }

  static set context(context) {
    this.#context = context;
  }
}

export { State };
