// provide interface for retrieving Memento metadata
// it doesn't expose Originator state
class Memento {
  #state = null;
  #date = null;

  constructor(state) {
    this.#state = state;
    this.#date = new Date().toISOString().slice(0, 19).replace('T', ' ');
  }

  // Originator uses this method to restore its state
  getState() {
    return this.#state;
  }

  /* --- some methods retrieving metadata --- */
  getName() {
    return `${this.#date} / (${this.#state.substr(0, 9)}...)`;
  }

  getDate() {
    return this.#date;
  }
}

export { Memento };
