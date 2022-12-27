import { AbstractHandler } from './handler';

// concrete Handler either handle request or pass it to next handler
class Handler1 extends AbstractHandler {
  handle(request) {
    // handle request
    if (request === 1) {
      return `Handler1: handle ${request}`;
    }
    // pass it to next handler
    return super.handle(request);
  }
}

export { Handler1 };
