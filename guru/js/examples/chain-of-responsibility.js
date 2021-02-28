import { Handler1, Handler2, Handler3 } from '../patterns/chain-of-responsibility';

// client code usually suited to work with single handler
// in most cases it is not even aware that handler is part of chain
function clientCode(handler) {
  const requests = [1, 2, 3];
  requests.forEach((request) => {
    console.log(`Client: who can handle ${request}`);
    const result = handler.handle(request);
    if (result) {
      console.log(`   ${result}`);
    } else {
      console.log(`   Nobody can handle ${result}`);
    }
  });
}

/* --- build chain --- */
const handler1 = new Handler1();
const handler2 = new Handler2();
const handler3 = new Handler3();

handler1.setNext(handler2).setNext(handler3);

/* --- sending requests --- */

// all handlers
console.log('Chain: 1 -> 2 -> 3\n');
clientCode(handler1);

// some of handlers
console.log('Subchain: 2 -> 3\n');
clientCode(handler2);
