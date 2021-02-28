import { FlyweightFactory } from '../patterns/flyweight';

// some client code
function addCarToDatabase(flyweightFactory, plates, owner, brand, model, color) {
  console.log('\nClient: adding new car to database...');
  // get intrinsic (common) state
  const flyweight = flyweightFactory.getFlyweight([brand, model, color]);
  // add extrinsic (unique) state
  flyweight.operation([plates, owner]);
}

// create some predefined Flyweights
const flyweightFactory = new FlyweightFactory([
  ['Chevrolet', 'Camaro2018', 'pink'],
  ['Mercedes Benz', 'C300', 'black'],
  ['Mercedes Benz', 'C500', 'red'],
  ['BMW', 'M5', 'red'], // <-- this Flyweight already present and will be used
  ['BMW', 'X6', 'white'],
]);

// list Flyweights: return predefined Flyweights only
flyweightFactory.listFlyweights();

// predefined Flyweight (BMV_M5_red) will be used
addCarToDatabase(flyweightFactory, 'CL234IR', 'James Doe', 'BMW', 'M5', 'red');

// new Flyweight (BMV_X1_red) will be created
addCarToDatabase(flyweightFactory, 'CL244IR', 'Janny Doe', 'BMW', 'X1', 'red');

// list Flyweights: return predefined Flyweights +
// new 'BMV_X1_red' Flyweight
flyweightFactory.listFlyweights();
