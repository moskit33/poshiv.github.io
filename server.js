const path = require("path");
const express = require("express");
const nodeMailer = require("nodemailer");
const bodyParser = require("body-parser");
const app = express();
const publicPath = path.join(__dirname, "..", "build");
const port = process.env.PORT || 3000;
app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});
app.post("/send-email", async function (req, res) {
  let transporter = nodeMailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: "moskit544@gmail.com",
      pass: "rqkrwbcewmwhzezr",
    },
  });
  console.log("BACKEND REQ", req.body);
  let mailOptions = {
    from: '"Швейное предприятие" <foo@example.com>', // sender address
    to: req.body.user_email, // list of receivers
    subject: "Заявка на пошив одежды", // Subject line
    text: `Добрый день ${req.body.user_name}! Вы оставили заяку на нашем сайте`, // plain text body
    html: `<b>Добрый день ${req.body.user_name}! Вы оставили заяку на нашем сайте</b>`, // html body
  };

  let info = await transporter.sendMail(mailOptions);

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodeMailer.getTestMessageUrl(info));
  res.send(200);
});
app.listen(port, () => {
  console.log("Server is up!");
});
