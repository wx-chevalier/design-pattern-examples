import { Component } from './component';

// implement specific functionality
// do not depend on other Component
// do not depend on any Mediator
class Component2 extends Component {
  doC() {
    console.log('Component2 do C.');
    this.mediator.notify(this, 'C');
  }

  doD() {
    console.log('Component2 do D.');
    this.mediator.notify(this, 'D');
  }
}

export { Component2 };
