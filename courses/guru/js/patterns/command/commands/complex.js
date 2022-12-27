// reference to some Receiver
let privateReceiver = null;

/* --- context data --- */
let privateA = null;
let privateB = null;

// delegate "complex" operations to other objects: Recievers
class ComplexCommand {
  // can accept one or several Receiver objects + some context data
  constructor(receiver, a, b) {
    privateReceiver = receiver;
    privateA = a;
    privateB = b;
  }

  // command can be delegated to any Receiver method
  execute() {
    console.log('ComplexCommand: complex command will be done by receiver object.');
    privateReceiver.doSmth(privateA);
    privateReceiver.doSmthElse(privateB);
  }
}

export { ComplexCommand };
