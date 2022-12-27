// reference to Collection
let privateCollection = null;

// save current position
let privatePosition = 0;

// traversal direction
let privateIsReverse = false;

// implement some traversal algorithm
// other Iterator must implement all these methods
class Iterator1 {
  constructor(collection, isReverse = false) {
    privateCollection = collection;
    privateIsReverse = isReverse;

    if (isReverse) {
      privatePosition = privateCollection.getCount() - 1;
    }
  }

  // set current position to first element
  rewind() {
    privatePosition = privateIsReverse ? privateCollection.getCount() - 1 : 0;
  }

  // return current element
  current() {
    return privateCollection.getItems()[privatePosition];
  }

  // return key of current element
  key() {
    return privatePosition;
  }

  // return current element and set position forward
  next() {
    const item = privateCollection.getItems()[privatePosition];
    privatePosition += privateIsReverse ? -1 : 1;
    return item;
  }

  // check: is current position is valid?
  valid() {
    if (privateIsReverse) {
      return privatePosition >= 0;
    }

    return privatePosition < privateCollection.getCount();
  }
}

export { Iterator1 };
