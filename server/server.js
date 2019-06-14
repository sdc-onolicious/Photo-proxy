require('newrelic');

const express = require('express');
const port = 3000;
const path = require('path');
const cors = require('cors');
const app = express();
const request = require('request')
app.use(cors());
app.use(express.static(path.resolve(__dirname, '../client/public')));

app.get('/overviews/:id', (req, res) => {
  if (!req.params.id) {
    res.status(400);
    res.end();
  } else {
    res.sendFile('index.html', { root: path.resolve(__dirname, '../client/public') });
  }
});


app.get('/API/info/:resid', (req, res)=>{
  var resid = req.params.resid
  if (!resid) {
    res.status(400);
    res.end();
  } else {
    request.get({url: 'localhost:3050/API/info/'+ resid}, (err, response, body)=>{
      console.log(err, response, body);
      if (err){
        res.status(500);
        res.end()
      } else {
        res.status(200)
        res.send(body);
      }
    })
  }
})
 

app.get('/API/photo/:resid', (req, res)=>{
  var resid = req.params.resid
  if (!resid) {
    res.status(400);
    res.end();
  } else {
    request.get({url: 'localhost:3060/API/photo/'+ resid}, (err, response, body)=>{
      console.log(err, response, body);
      if (err){
        res.status(500);
        res.end()
      } else {
        res.status(200);
        res.send(body);
      }
    })
  }
})



app.listen(port, () => console.log(`Listening on port ${port}!`));

module.exports.app = app;