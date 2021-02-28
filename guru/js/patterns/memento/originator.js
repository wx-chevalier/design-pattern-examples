import { Memento } from './memento';

// hold some important state that may change over time
class Originator {
  #state = null;
  #generateRandomString = function(length = 10) {
    const charSet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  
    return Array
      .apply(null, { length })
      .map(() => charSet.charAt(Math.floor(Math.random() * charSet.length)))
      .join('');
  }

  constructor(state) {
    this.#state = state;
    console.log(`Originator: initial state is: ${state}`);
  }

  // some business logic
  // be aware that this method can affect Originator state
  // so Client should backup state before executing these methods (via save method)
  doSmth() {
    console.log('Originator: doing smth...');
    this.#state = this.#generateRandomString(30);
    console.log(`Originator: my state changed to: ${this.#state}`);
  }

  // save state in Memento
  save() {
    return new Memento(this.#state);
  }

  // restore state from Memento
  restore(memento) {
    this.#state = memento.getState();
    console.log(`Originator: state changed to: ${this.#state}`);
  }
}

export { Originator };
