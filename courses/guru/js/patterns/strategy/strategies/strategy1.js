// concrete algorithm
// all Strategies must implement this interface
class Strategy1 {
  doAlgorithm(data) {
    return data.sort();
  }
}

export { Strategy1 };
