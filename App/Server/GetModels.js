const {getBrands} = require('node-car-api');
const {getModels} = require('node-car-api');
var fs = require('fs');

var elasticsearch = require('elasticsearch');

var client = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'trace'
});

client.ping({
  requestTimeout: 100000,
}, function (error) {
  if (error) {
    console.error('elasticsearch cluster is down!');
  } else {
    console.log('Everything is ok');
  }
});

async function GetModels() {
  const brands = await getBrands();
  console.log(brands);
  const cars = [];
  var i = 1
  for(brand of brands)
  {
    var carsWithBrand = await getModels(brand);
    for(car of carsWithBrand) {
      cars.push({index:{_index:"cars",_type:"car",_id: i}})
      cars.push(car);
      i++;
      console.log(i);
    };
  }
  client.bulk({"body":cars}, function (err, resp, status) {
        console.log(resp);
  });
};

exports.GetModels = GetModels;
