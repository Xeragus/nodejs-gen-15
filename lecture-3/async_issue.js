// simulacija na baza
const cars = [
  {
    brand: 'BMW',
    model: 'X6'
  },
  {
    brand: 'Mercedes',
    model: 'C123'
  }
];

const createCar = car => {
  console.log('==== createCar() function called ====')

  setTimeout(() => {
    cars.push(car);
    // konkatenacija
    // console.log('Car created: ' + car.brand + ' ' + car.model);
    // interpolacija
    console.log(`Car created: ${car.brand} ${car.model}`);
  }, 2000)
};

const getCars = () => {
  console.log('==== getCars() function called ====')

  setTimeout(() => {
    cars.forEach(car => {
      console.log(`Car: ${car.brand} ${car.model}`);
    })
  }, 1000);
};

createCar({ brand: 'Opel', model: 'Insignia' });
getCars();
