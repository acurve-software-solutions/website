const express     = require("express"),
app         = express(),
bodyParser  = require("body-parser") ,
nodeMailer = require('nodemailer');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

require('dotenv').config()

//root route
app.get("/", function(req, res){
    res.render("index");
});
app.get("/about", function(req, res){
    res.render("about");
});
app.get("/portfolio", function(req, res){
    res.render("portfolio");
});
app.get("/contact", function(req, res){
    res.render("contact");
});

//email config

app.post('/query', function (req, res) {
  let transporter = nodeMailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
          user: 'mail.acurve@gmail.com',
          pass: 'acurvemail111!'
      }
  });
  let mailOptions = {
      from:'mail.acurve@gmail.com',
      to: 'acurvesoftwaresolutions@gmail.com',
      subject: req.body.subject,
      body: req.body.message
  };
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message %s sent: %s', info.messageId, info.response);
  });
  let mailOptions2 = {
    from:'mail.acurve@gmail.com',
    to: req.body.subject,
    subject: 'no reply',
    body: 'Thanks for showing your interest in working with us !! Our team will get in touch Shortly.'
};
transporter.sendMail(mailOptions2, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
});
  res.writeHead(301, { Location: '/' });
  res.end();
});

app.listen(process.env.PORT || 5000,function() {
    console.log("acurve server started!!")
  });
  