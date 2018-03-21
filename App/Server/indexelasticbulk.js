var elasticsearch = require('elasticsearch');
var fs  = require('fs')
var cars = []

var client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
});

client.ping({
  // ping usually has a 3000ms timeout
  requestTimeout: 10000
}, function (error) {
  if (error) {
    console.trace('elasticsearch cluster is down!');
  } else {
    console.log('All is well');
  }
});

console.log("TA MERE");

var obj = JSON.parse(fs.readFileSync('cars.json', 'utf8'))
var i = 1
obj.forEach(function(model)
{
  cars.push( {index : { _index: 'populate', _type: 'model', _id: i }})
  cars.push({ doc: model})
  i++
})
console.log(cars);


client.bulk({
  body : cars
}, function (err, resp) {
});
