const express = require("express");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const authRouter = require("./routes/admin/auth");

const app = express();

const usersRepo = require("./repositories/users");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cookieSession({
    keys: ["ksoksksoskoskoskodh"]
  })
);
app.use(authRouter);

app.listen(process.env.port || 3000, () => {
  console.log("Listenning in port 3000");
});
