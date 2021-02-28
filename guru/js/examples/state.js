import { Context, State1 } from '../patterns/state';

// set context with initial state
const context = new Context(new State1());

// switch to other state (to state 2)
context.request1();

// swith to another state (back to state 1)
context.request2();
