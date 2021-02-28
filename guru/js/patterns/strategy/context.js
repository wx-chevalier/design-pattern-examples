// defines interface for Client interest
// doesn't know concrete Strategy
// should work with all Strategies using Strategy interface
class Context {
  // reference to one of Strategy
  #strategy = null;

  // set Strategy through constructor
  constructor(strategy) {
    this.#strategy = strategy;
  }

  // set Strategy at runtime
  setStrategy(strategy) {
    this.#strategy = strategy;
  }

  // delegate work to Strategy instead of implementing multiple versions of algorithm
  businessLogic() {
    console.log('Context: sort data using some strategy...');
    const result = this.#strategy.doAlgorithm(['a', 'b', 'c', 'd', 'e']);
    console.log(result.join(','));
  }
}

export { Context };
