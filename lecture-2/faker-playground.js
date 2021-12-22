const faker = require('faker');

console.log(faker.address.streetAddress());
console.log(faker.name.title() + ' ' + faker.name.findName());