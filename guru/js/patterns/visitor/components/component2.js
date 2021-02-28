// every concrete Component must implement 'accept' method
// it can call corresponding to Component Visitor
class Component2 {
  accept(visitor) {
    visitor.visitComponent2(this);
  }

  // special Component method
  // Visitor can use it (it aware of concrete Component)
  specialMethodOfComponent2() {
    return '2';
  }
}

export { Component2 };
