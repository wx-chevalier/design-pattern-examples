// default chaining behavoir
class AbstractHandler {
  // build chain of handlers
  setNext(handler) {
    this.nextHandler = handler;
    return handler;
  }

  // execute request
  handle(request) {
    if (this.nextHandler) {
      return this.nextHandler.handle(request);
    }
    return null;
  }
}

export { AbstractHandler };
