import { Component1, Component2, Mediator1 } from '../patterns/mediator';

const component1 = new Component1();
const component2 = new Component2();
// eslint-disable-next-line no-unused-vars
const mediator1 = new Mediator1(component1, component2);

/* --- call Component1 method --- */

console.log('Client trigger operation A...');
component1.doA();

console.log('');

/* --- call Component2 method --- */

console.log('Client trigger oparation D...');
component2.doD();
