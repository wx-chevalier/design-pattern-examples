import {
  SimpleCommand,
  ComplexCommand,
  Invoker1,
  Receiver1,
} from '../patterns/command';

// client code can parameterize Invoker with any Command

const invoker1 = new Invoker1();
const receiver1 = new Receiver1();

/* --- do simple command --- */
invoker1.setOnStart(new SimpleCommand('Hi!'));

/* --- do complex command --- */
invoker1.setOnFinish(new ComplexCommand(receiver1, 'Send email', 'Save report'));

invoker1.doSmthImportant();
