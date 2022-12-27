import { Component } from './component';

// represent complex components that may have children
// usually these objects delegate actual work to their children and "sum-up" result
class ComponentComposite extends Component {
  constructor() {
    super();
    this.children = [];
  }

  // add other components (both simple or complex) to its children list
  add(component) {
    this.children.push(component);
    super.setParent(this);
  }

  // remove component (both simple or complex) from its children list
  remove(component) {
    const componentIndex = this.children.indexOf(component);
    this.children.splice(componentIndex, 1);
    component.setParent(null);
  }

  // override superclass behavoir: its composite component
  isComposite() {
    return true;
  }

  // recursively traverse througn all children collecting and summing their results
  operation() {
    const results = [];
    this.children.forEach(child => results.push(child.operation()));
    return `Branch (${results.join(' + ')})`;
  }
}

export { ComponentComposite };
