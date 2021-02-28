// private data
const privateObject = {
  username: 'sparx',
  password: 'superpassword',
};

// instance save
let instance = null;

class Singleton {
  constructor() {
    // if we have instance just return it
    if (instance) return instance;
    // else: save Singleton object to instance
    instance = this;
    // add private data to instance object
    return Object.assign(instance, privateObject);
  }

  // static method for instance access
  static getInstance() {
    // if we have instance just return it
    if (instance) return instance;
    // else: create instance of Singleton and return it
    return new Singleton();
  }
}

export { Singleton };
