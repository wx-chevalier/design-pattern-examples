import { AbstractHandler } from './handler';

// concrete Handler either handle request or pass it to next handler
class Handler2 extends AbstractHandler {
  handle(request) {
    // handle request
    if (request === 2) {
      return `Handler2: handle ${request}`;
    }
    // pass it to next handler
    return super.handle(request);
  }
}

export { Handler2 };
