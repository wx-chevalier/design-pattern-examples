// contains some business logic
// it knows how perform all kinds of operations, associated with request
class Receiver1 {
  doSmth(a) {
    console.log(`Receiver1: working on (${a})`);
  }

  doSmthElse(b) {
    console.log(`Receiver1: also working on (${b})`);
  }
}

export { Receiver1 };
