/* --- references to connected components --- */
let component1 = null;
let component2 = null;

// concrete Mediator implement cooperative behavior by coordinating several components
class Mediator1 {
  constructor(c1, c2) {
    component1 = c1;
    component1.mediator = this;

    component2 = c2;
    component2.mediator = this;
  }

  // method used by components to notify Mediator about some events
  // Mediator may react to these events and pass execution to other components
  notify(sender, event) {
    if (event === 'A') {
      console.log('Mediator1 react on event A and trigger following operations:');
      component2.doC();
    }

    if (event === 'D') {
      console.log('Mediator1 react on event D and trigger following operations:');
      component1.doB();
      component2.doC();
    }
  }
}

export { Mediator1 };
