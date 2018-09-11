require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const Pusher = require('pusher');
require('dotenv').config();


const app = express();
const port = process.env.PORT || 4000;
const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.PUSHER_KEY,
    secret: process.env.PUSHER_SECRET,
    cluster: 'us2',
    encrypted: true
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
});


app.post('/paint', (req, res) => {
  pusher.trigger('painting', 'draw', req.body);
  res.json(req.body);
});

app.post('/message', (req, res) => {
    pusher.trigger('message', 'text', req.body);
    res.json(req.body);
});

app.post('/pusher/auth', function(req, res) {
    console.log(req.body.socket_id+" has been authenticated")
    var socketId = req.body.socket_id;
    var channel = req.body.channel_name;
    var auth = pusher.authenticate(socketId, channel);
    res.send(auth);
  });

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});