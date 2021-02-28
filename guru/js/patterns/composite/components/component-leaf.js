import { Component } from './component';

// end object of composition
// can't have any children

// usually these objects do actual work
class ComponentLeaf extends Component {
  operation() {
    return 'Leaf';
  }
}

export { ComponentLeaf };
