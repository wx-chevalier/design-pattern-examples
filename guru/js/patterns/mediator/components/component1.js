import { Component } from './component';

// implement specific functionality
// do not depend on other Component
// do not depend on any Mediator
class Component1 extends Component {
  doA() {
    console.log('Component1 do A.');
    this.mediator.notify(this, 'A');
  }

  doB() {
    console.log('Component1 do B.');
    this.mediator.notify(this, 'B');
  }
}

export { Component1 };
