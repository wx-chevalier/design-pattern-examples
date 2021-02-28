// all Observers must implement this method used by Subjects
class Observer1 {
  // recieve update from subject
  update(subject) {
    if (subject.state < 5) {
      console.log('Observer1: react to event.');
    }
  }
}

export { Observer1 };
