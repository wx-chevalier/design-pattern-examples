// implement set of visiting methods corresponding to Components
class Visitor2 {
  // visit one Component and execute it method
  visitComponent1(element) {
    console.log(`${element.exclusiveMethodOfComponent1()} + Visitor 2`);
  }

  // visit another Component and execute it method
  visitComponent2(element) {
    console.log(`${element.specialMethodOfComponent2()} + Visitor 2`);
  }
}

export { Visitor2 };
