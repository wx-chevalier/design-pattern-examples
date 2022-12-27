// all Observers must implement this method used by Subjects
class Observer2 {
  // recieve update from subject
  update(subject) {
    if (subject.state === 0 || subject.state >= 4) {
      console.log('Observer2: react to event.');
    }
  }
}

export { Observer2 };
