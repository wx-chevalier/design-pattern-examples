import { Context, Strategy1, Strategy2 } from '../patterns/strategy';

// create context and use some Strategy
const context = new Context(new Strategy1());
console.log('Client: strategy with normal sorting.');
context.businessLogic();

console.log('');

// use another Strategy
console.log('Client: strategy with reverse sorting.');
context.setStrategy(new Strategy2());
context.businessLogic();
