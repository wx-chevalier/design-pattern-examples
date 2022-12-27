import { Target } from './target';

// makes Adaptee interface compatible with Target interface
class Adapter extends Target {
  constructor(adaptee) {
    super();
    this.adaptee = adaptee;
  }

  request() {
    const result = this.adaptee.incompatableRequest().split('').reverse().join('');
    return `ADAPTER: (TRANSLATED) ${result}`;
  }
}

export { Adapter };
