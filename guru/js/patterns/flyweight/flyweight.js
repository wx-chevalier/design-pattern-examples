// store intrinsic and add extrinsic states
class Flyweight {
  // store intrinsic (common) state that belongs to many entities
  constructor(sharedState) {
    this.sharedState = sharedState;
  }

  // add extrinsic (unique) state
  operation(uniqueState) {
    const s = JSON.stringify(this.sharedState);
    const u = JSON.stringify(uniqueState);
    console.log(`Flyweight: Shared state: (${s}); Unique state: (${u})`);
  }
}

export { Flyweight };
