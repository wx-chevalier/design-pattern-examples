import { Director, Builder1, Builder2 } from '../patterns/builder';

// this required only if predefined products will be used
const director = new Director();

/* --- build products #1 --- */

// create builder object
let builder = new Builder1();

// pass it to director
director.setBuilder(builder);

// create some predefined product #1 via director
console.log('Basic product #1:');
director.buildMinimalProduct();
builder.getProduct().listParts();

// create some predefined product #1 via director
console.log('Full product #1:');
director.buildFullProduct();
builder.getProduct().listParts();

// manual product #1 building
console.log('Custom product #1:');
builder.producePartA();
builder.producePartC();
builder.getProduct().listParts();

/* --- build products #2 --- */

// create builder object
builder = new Builder2();

// pass it to director
director.setBuilder(builder);

// create some predefined product #2 via director
console.log('Basic product #2:');
director.buildMinimalProduct();
builder.getProduct().listParts();

// create some predefined product #2 via director
console.log('Full product #2:');
director.buildFullProduct();
builder.getProduct().listParts();

// manual product #2 building
console.log('Custom product #2:');
builder.producePartA();
builder.producePartC();
builder.getProduct().listParts();
