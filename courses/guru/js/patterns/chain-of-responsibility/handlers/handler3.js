import { AbstractHandler } from './handler';

// concrete Handler either handle request or pass it to next handler
class Handler3 extends AbstractHandler {
  handle(request) {
    // handle request
    if (request === 3) {
      return `Handler3: handle ${request}`;
    }
    // pass it to next handler
    return super.handle(request);
  }
}

export { Handler3 };
