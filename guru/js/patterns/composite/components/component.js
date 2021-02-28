// base class declaring common operations for
// both simple and complex composed objects

class Component {
  // set component parent in tree structure
  setParent(parent) {
    this.parent = parent;
  }

  // get component parent in tree structure
  getParent() {
    return this.parent;
  }

  // check whether component can have children
  // its simple component by default
  isComposite() {
    return false;
  }

  // implement some default behavoir or leave it to concrete class
  operation() {}
}

export { Component };
