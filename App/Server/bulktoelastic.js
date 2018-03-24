var elasticsearch = require('elasticsearch');
var fs = require("fs");

var client = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'trace'
});

client.ping({
    requestTimeout: 30000,
  }, function (error) {
    if (error) {
      console.error('elasticsearch cluster is down!');
    } else {
      console.log('All is well');
    }
});

function Insertion(){
    var json = JSON.parse(fs.readFileSync("./cars.json","utf8"));
    var bodyBrand = {
        body:[
        ]
    };
    for(var i = 0; i < json.length; i++){
        bodyBrand.body.push({ index:  { _index: 'cars', _type: 'suv', _id: i } });
        bodyBrand.body.push({  doc : json[i]} );
    }
    client.bulk(bodyBrand);
}

Insertion();
