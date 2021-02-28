// define skeleton of algorithm composed from primitive operations
class Operation {
  // algorithm skeleton
  templateMethod() {
    this.baseOperation1();
    this.requredOperation1();
    this.baseOperation2();
    this.hook1();
    this.requredOperation2();
    this.baseOperation3();
    this.hook2();
  }

  /* --- default operations implementation --- */
  baseOperation1() {
    console.log('Operation: do base operation 1.');
  }

  baseOperation2() {
    console.log('Operation: do base operation 2.');
  }

  baseOperation3() {
    console.log('Operation: do base operation 3.');
  }

  /* --- operations implemented in subclasses --- */
  requredOperation1() {}

  requredOperation2() {}

  /* --- these methods provide additional extension points somewhere in algoriythm --- */
  hook1() {}

  hook2() {}
}

export { Operation };
