// every concrete Component must implement 'accept' method
// it can call corresponding to Component Visitor
class Component1 {
  accept(visitor) {
    visitor.visitComponent1(this);
  }

  // special Component method
  // Visitor can use it (it aware of concrete Component)
  exclusiveMethodOfComponent1() {
    return '1';
  }
}

export { Component1 };
