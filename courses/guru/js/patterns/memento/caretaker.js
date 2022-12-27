// doesn't depend on Memento
// doesn't have access to Originator state stored in Memento
// it works with all mementos via Memento interface
class Caretaker {
  #mementos = [];
  #originator = null;

  constructor(originator) {
    this.#originator = originator;
  }

  // save current memento state
  backup() {
    console.log('\nCaretaker: saving Originator state...');
    this.#mementos.push(this.#originator.save());
  }

  // restore memento to previous state
  undo() {
    if (!this.#mementos.length) {
      return;
    }
    const memento = this.#mementos.pop();
    console.log(`Caretaker: restoring state to: ${memento.getName()}`);
    this.#originator.restore(memento);
  }

  // list all saved mementos
  showHistory() {
    console.log('Caretaker: list of mementos:');
    this.#mementos.forEach((memento) => {
      console.log(memento.getName());
    });
  }
}

export { Caretaker };
