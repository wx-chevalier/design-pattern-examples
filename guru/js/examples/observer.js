import { Subject1, Observer1, Observer2 } from '../patterns/observer';

// create subject
const subject1 = new Subject1();

// create observer
const observer1 = new Observer1();
// attach observer to subject
subject1.attach(observer1);

// create another observer
const observer2 = new Observer2();
// attach this observer to same subject
subject1.attach(observer2);

// execute some business logic methods
// both observers will be notified about some event
subject1.someBusinessLogic();
subject1.someBusinessLogic();

// detach second observer from subject
subject1.detach(observer2);

// execute some business logic methods again
// now only first observer will be notified about some event
subject1.someBusinessLogic();
