let onStart = null;
let onFinish = null;

function isCommand(object) {
  return object.execute !== undefined;
}

// associated with one or several commands
// it sends request to command
class Invoker1 {
  // initialize command
  setOnStart(command) {
    onStart = command;
  }

  // initialize command
  setOnFinish(command) {
    onFinish = command;
  }

  // Invoker doesn't depend on concrete Command or Receiver
  // it pass request to Receiver indirectly by executing some Command
  doSmthImportant() {
    console.log('Invoker1: Does anybody want something done before I begin?');
    if (isCommand) {
      onStart.execute();
    }

    console.log('Invoker1: ...doing something really important...');
    console.log('Invoker1: Does anybody want something done after I finish?');
    if (isCommand) {
      onFinish.execute();
    }
  }
}

export { Invoker1 };
