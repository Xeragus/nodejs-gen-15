// boolean
// number
// string
// undefined
// null
// object

// Diskusija za array vs object
// console.log(typeof([]));
// console.log([].length)

// simulacija na baza
const people = [
  {
    name: 'Boban Sugareski',
    club: 'Arsenal'
  },
  {
    name: 'Zoki Z.',
    club: 'Bregalnica'
  },
  {
    name: 'Ivo',
    club: null
  }
];

// Da se napise programa koja kje gi ispecati lugjeto so omilen klub, a za tie koi nemaat kje pise deka nemaat omilen klub

// arrow function syntax
people.forEach(person => {
  if (person.club) {
    console.log(person.name);
    console.log(person.club);
  } else {
    console.log(person.name);
    console.log('Nema omilen klub!');
  }
});
