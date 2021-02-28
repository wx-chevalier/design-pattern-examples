// must have same interface as Subject
class Proxy {
  #subject = null;

  #checkAccess = function() {
    console.log('Proxy: check access before executing real request...');
    return true;
  }

  #logAccess = function() {
    console.log('Proxy: log request.');
  }

  // reference to object of Subject class
  constructor(subject) {
    this.#subject = subject;
  }

  // Proxy may do smth before and after real request
  request() {
    if (this.#checkAccess()) {
      this.#subject.request();
      this.#logAccess();
    }
  }
}

export { Proxy };
