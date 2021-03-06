var nr = require('newrelic'),
    express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    Raffle = require('./api/models/raffle.model'),
    bodyParser = require('body-parser'),
    routes = require('./api/routes/raffle.routes');

mongoose.Promise = global.Promise;
mongoose.set('useUnifiedTopology', true);
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/Raffledb', { useNewUrlParser: true });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app)

app.use(express.static(__dirname + '/src'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));

app.use(function(req, res) {
  res.status(404).send({ url: req.originalUrl + ' not found' })
});

app.listen(process.env.PORT || port);

console.log('Raffle RESTful API server started on: localhost:' + port);
