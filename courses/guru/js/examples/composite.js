import { ComponentLeaf, ComponentComposite } from '../patterns/composite';

// client code works with all (simple and both) components via base interface
function clientCode(component) {
  console.log(`RESULT: ${component.operation()}`);
}

/* --- simple component --- */
const leaf = new ComponentLeaf();

console.log('Client: Simple component:');
clientCode(leaf);

/* --- composite component --- */
// make "root" component
const tree = new ComponentComposite();
// make one composite component
const branch1 = new ComponentComposite();
// add some simple components to this composite component
branch1.add(new ComponentLeaf());
branch1.add(new ComponentLeaf());

// make another composite component
const branch2 = new ComponentComposite();
// add some simple component to another composite component
branch2.add(new ComponentLeaf());

// add composite components to "root" component
tree.add(branch1);
tree.add(branch2);

console.log('Client: Composite component:');
clientCode(tree);
