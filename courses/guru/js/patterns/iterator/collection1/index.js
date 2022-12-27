import { Iterator1 } from './iterator1';

const items = [];

// Collection provide some methods for retreiving items
class Collection1 {
  getItems() {
    return items;
  }

  getCount() {
    return items.length;
  }

  addItem(item) {
    items.push(item);
  }

  getIterator() {
    return new Iterator1(this);
  }

  getReverseIterator() {
    return new Iterator1(this, true);
  }
}

export { Collection1 };
