const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const jwt = require('./server/routes/jwt');

const app = express();  
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(jwt());

require('./server/routes')(app);
app.get('*', express.static(__dirname + '/dist'));

const port = process.env.NODE_ENV === 'production' ? 80 : 4000;
app.listen(port, function () {
    console.log('Server listening on port ' + port);
});