var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");    // for create path string
var app = express();
const {serviceCaller} = require('./rest')
const { dataSelector } = require('./selector')

// ------- start use another module zone -----------

// for parse data in payload
app.use(bodyParser.urlencoded({
   extended: true
}));
app.use(bodyParser.json()); 

// for create link to static file
// access resource such as localhost:3000/image/picture01.jpg
// ** image is subfolder of public
app.use(express.static(path.join(__dirname, "/public")));

// -------------- end use zone ------------------

// ------------- start route zone -----------------

app.get("/", async (req, res) => {
  try {
    const response = await serviceCaller.getData()
    res.json(response);
  } catch (e) {
    res.json(e)
  }
});

app.get('/year/:year', async (req, res) => {
  try {
    const data = await serviceCaller.getData()
    const response = dataSelector.selectByYear(data, req.params.year)
    res.json(response)
  }catch(e) {

  }
})

app.get('/topic/:key', async (req, res) => {
  try {
    const data = await serviceCaller.getData()
    const response = dataSelector.selectByTopic(data, req.params.key)
    res.json(response)
  }catch(e) {
    res.json(e)
  }
})
// ------------- end route zone ------------------

// initialize server
var server = app.listen(3000, function(){
   var host = server.address().address;
   var port = server.address().port;

   console.log("Listening at http://%s:%s", host, port);
});