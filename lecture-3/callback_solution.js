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

// definicija na createCar funkcija
const createCar = (car, getCars, testCars) => {
  console.log('==== createCar() function called ====')

  setTimeout(() => {
    cars.push(car);
    console.log(`Car created: ${car.brand} ${car.model}`);
    getCars(testCars);
  }, 2000)
};

// definicija na funkcija
const getCars = (testCars) => {
  console.log('==== getCars() function called ====')

  setTimeout(() => {
    cars.forEach(car => {
      console.log(`Car: ${car.brand} ${car.model}`);
    });
    testCars();
  }, 1000);
};

const testCars = () => {
  console.log('==== testCars() function called ====')

  setTimeout(() => {
    cars.forEach(car => {
      console.log(`Car tested: ${car.brand} ${car.model}`);
    })
  }, 3000);
}

// povik na createCar funkcijata
createCar({ brand: 'Opel', model: 'Insignia' }, getCars, testCars);
