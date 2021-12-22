const printer = (people) => {
  people.forEach(person => {
    if (person.club) {
      console.log(person.name);
      console.log(person.club);
    } else {
      console.log(person.name);
      console.log('Nema omilen klub!');
    }
  });
}

const hehe = () => {
  console.log('hehehehe');
}

module.exports = {
  yaya: printer,
  hehe: hehe,
  hihi: [true, false, {}, 5, [{}, 5, false]]
};
