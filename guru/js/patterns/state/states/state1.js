import { State } from './state';
import { State2 } from './state2';

// implement behaviors associated with Context state
// all concrete States must implement these methods
class State1 extends State {
  handle1() {
    console.log('State1: handle request1.');
    console.log('State1: change state of context.');
    this.context.transitionTo(new State2());
  }

  handle2() {
    console.log('State1: handle request2.');
  }
}

export { State1 };
