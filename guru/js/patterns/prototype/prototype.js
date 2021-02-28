// class supporting cloning must implement 'clone()' method
class Prototype {
  constructor() {
    this.primitive = null;
    this.component = {};
    this.circularReference = null;
  }

  clone() {
    // create new 'Prototype' object
    const clone = Object.create(this);
    // fill this new objects with keys and its values
    clone.component = Object.assign(this.component);
    clone.circularReference = Object.assign(this.circularReference);
    return clone;
  }
}

export { Prototype };
