import { Originator, Caretaker } from '../patterns/memento';

const originator = new Originator('Super-duper-super-puper-super.');
const caretaker = new Caretaker(originator);

caretaker.backup();
originator.doSmth();

caretaker.backup();
originator.doSmth();

caretaker.backup();
originator.doSmth();

caretaker.backup();
originator.doSmth();

console.log('');
caretaker.showHistory();

console.log('\nClient: do rollback...');
caretaker.undo();

console.log('\nClient: do rollback again...');
caretaker.undo();
