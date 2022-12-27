// implement set of visiting methods corresponding to Components
class Visitor1 {
  // visit one Component and execute it method
  visitComponent1(element) {
    console.log(`${element.exclusiveMethodOfComponent1()} + Visitor 1`);
  }

  // visit another Component and execute it method
  visitComponent2(element) {
    console.log(`${element.specialMethodOfComponent2()} + Visitor 1`);
  }
}

export { Visitor1 };
