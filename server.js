const express = require('express')
const bodyParser = require('body-parser');
const path = require('path');
const axios = require('axios');
const nodemailer = require('nodemailer');
const creds = require('./creds.js');
const app = express()

app.use(express.static('dist'))
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json())
app.use('/static', express.static(path.join(__dirname, 'dist')))

app.post('/verify', function(req, res) {
  var opts = creds.captcha + req.body.verify
  axios.post('https://www.google.com/recaptcha/api/siteverify', opts)
    .then(function(gRes) {
      if (gRes.data.success) {
        email(req.body);
        res.send('OK')
      } else {
        res.send('Bot detected :/')
      }
    })
    .catch(function(err) {
      console.log(err)
    })
})

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: creds.email,
 });

function email(data) {
  const mailOptions = {
    from: 'coltonsavage.dev@gmail.com', // sender address
    to: 'csavage1994@gmail.com', // list of receivers
    subject: ('Website contact: ' + data.from + ', ' + data.email), // Subject line
    html: ('<p>'+ data.message +'</p>')// plain text body
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if(err)
      console.log(err)
    else
      console.log(info);
  });
}

app.listen(3000, () => console.log('Example app listening on port 3000!'));