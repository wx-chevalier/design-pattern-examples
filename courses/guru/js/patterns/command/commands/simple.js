// command payload
let privatePayload = null;

// simple operation made by its own
class SimpleCommand {
  constructor(payload) {
    privatePayload = payload;
  }

  execute() {
    console.log(`SimpleCommand: doing simple command (${privatePayload})`);
  }
}

export { SimpleCommand };
