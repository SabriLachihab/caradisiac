var elasticsearch = require('elasticsearch')
var fs = require('fs')

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

client.search({
  index: 'cars',
  body: {
    query: {
      match_all: {
      }
    },
    "sort": [
    {
      "doc.volume.keyword": {
        "order": "desc"
      }
    }
  ],
  "size": 20
  }
}).then(function (resp) {
    var hits = resp.hits.hits;
    fs.writeFile('result.json', JSON.stringify(resp.hits.hits, null, 4), 'utf8', function(error){
          if(error)
          {
            return console.log(error);
          }
            })
}, function (err) {
    console.trace(err.message);
});
