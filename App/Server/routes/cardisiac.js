const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const client = require('../ElasticsearchConnection');
const populate = require('../GetModels')
var fs = require('fs')


router.get('/populate',(req,res) =>
{
  res.send('Index the API of course');
  populate.GetModels();
  console.log("done");
})

router.get('/suv',(req,res) =>{
    const query = {
        'index': 'cars',
        'body': {
            'size': 20,
            'sort': [
                {
                    'doc.volume.keyword': {
                        'order': 'desc'
                    }
                }
            ],
            'query': {
                'match_all': {}
            }
        }
    };
    client.ping({
      requestTimeout: 10000
    },
    function (error)
    {
      if (error)
      {
        console.trace('elasticsearch cluster is down!');
      }
      else {
        console.log('All is well');
        client.search(query)
            .then((resp) => {
                res.send(resp.hits.hits)
            })
            .catch((err) => {
                res.send(err)
        });
      }
    });
})

module.exports = router;
