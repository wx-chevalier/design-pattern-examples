import { Flyweight } from './flyweight';

const flyweights = {};

// return Flyweight's string hash for given state
function getKey(state) {
  return state.join('_');
}

// creates and manages Flyweight objects
class FlyweightFactory {
  constructor(initialFlyweights) {
    initialFlyweights.forEach((state) => {
      flyweights[getKey(state)] = new Flyweight(state);
    });
  }

  // return existing Flyweight with given state or creates new one
  getFlyweight(sharedState) {
    const key = getKey(sharedState);
    if (!(key in flyweights)) {
      console.log('FlyweightFactory: no flyweight, creating new.');
      flyweights[key] = new Flyweight(sharedState);
    } else {
      console.log('FlyweightFactory: Reusing existing flyweigth.');
    }
    return flyweights[key];
  }

  // optional helper method for list present Flyweights
  listFlyweights() {
    const count = Object.keys(flyweights).length;
    console.log(`\nFlyweightFactory: have ${count} flyweights:`);
    const keys = Object.keys(flyweights);
    keys.forEach((key) => {
      console.log(key);
    });
  }
}

export { FlyweightFactory };
