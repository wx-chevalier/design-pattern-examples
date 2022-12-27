// manage subscribers
class Subject1 {
  // Subject state
  state = null;

  // list of subscribers
  #observers = [];

  // attach Observer to Subject
  attach(observer) {
    console.log('Subject1: attached to observer.');
    this.#observers.push(observer);
  }

  // detach Observer from Subject
  detach(observer) {
    const observerIndex = this.#observers.indexOf(observer);
    this.#observers.splice(observerIndex, 1);
    console.log('Subject1: detached observer.');
  }

  // notify all Observers about event
  notify() {
    console.log('Subject1: notifying observers...');
    this.#observers.forEach((observer) => {
      observer.update(this);
    });
  }

  // some business logic that triggers notification method when smth is happened
  someBusinessLogic() {
    console.log('\nSubject1: doing some business logic.');
    this.state = Math.floor(Math.random() * (10 + 1));

    console.log(`Subject1: state changed to: ${this.state}`);
    this.notify();
  }
}

export { Subject1 };
