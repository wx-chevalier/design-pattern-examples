import { Collection1 } from '../patterns/iterator';

// client code may or may not to know about concrete Iterator or Collection classes

/* --- make collection and add some items --- */
const collection1 = new Collection1();
collection1.addItem(1);
collection1.addItem(2);
collection1.addItem(3);

// make straight iterator
const iterator1 = collection1.getIterator();

console.log('Straight traversal:');
while (iterator1.valid()) {
  console.log(iterator1.next());
}

console.log('');
console.log('Reverse traversal:');

// make reverse iterator
const reverseIterator1 = collection1.getReverseIterator();
while (reverseIterator1.valid()) {
  console.log(reverseIterator1.next());
}
