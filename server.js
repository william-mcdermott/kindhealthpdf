var express = require('express');
var app = express();
var bodyparser = require('body-parser');
var busboy = require('connect-busboy');
var fileUpload = require('express-fileupload');


const PORT = process.env.PORT || 3000;

app.use(function (req, res, next) {
  if (req.headers['x-forwarded-proto'] === 'https') {
    res.redirect('http://' + req.hostname + req.url);
  } else {
    next();
  }
});

app.use(express.static('public'));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));
app.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 }
}));

// app.use(busboy());
require('./routes')(app);



app.listen(PORT, function(){
  console.log('Express server up on Port ' + PORT);
});
