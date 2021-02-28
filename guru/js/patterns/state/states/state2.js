import { State } from './state';
import { State1 } from './state1';

// implement behaviors associated with Context state
// all concrete States must implement these methods
class State2 extends State {
  handle1() {
    console.log('State2: handle request1.');
  }

  handle2() {
    console.log('State2: handle request2.');
    console.log('State2: change state of context.');
    this.context.transitionTo(new State1());
  }
}

export { State2 };
