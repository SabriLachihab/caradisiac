const { getBrands } = require('node-car-api');
const { getModels } = require('node-car-api');
var fs = require('fs');

async function print () {
  const models = await getModels('AUDI');
  console.log(models);
}

async function createjson() {
  const brands = await getBrands();
  //console.log(brands);
  const cars = [];
  brands.forEach(async brand => {
    var carsWithBrand = await getModels(brand);
    carsWithBrand.forEach(car => {
      cars.push(car);
    });
  fs.writeFile('cars.json', JSON.stringify(cars, null, 4), 'utf8', function(error){
        if(error)
        {
          return console.log(error);
        }
          else{
            console.log("we found "+ cars.length +" cars in Cardisiac");
          }
          })
	})
}

createjson()
