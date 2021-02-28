import { Subject, Proxy } from '../patterns/proxy';

// client can work through both Subject and Proxy interface
function clientCode(subject) {
  subject.request();
}

/* --- make request directly to Subject --- */

console.log('Client: execute Subject method...');
const subject = new Subject();
clientCode(subject);

/* --- make request over Proxy --- */

console.log('Client: execute Proxy method...');
const proxy = new Proxy(subject);
clientCode(proxy);
