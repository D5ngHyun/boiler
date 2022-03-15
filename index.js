const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const logger = require("morgan");

const config = require("./config/key");

const mongoose = require("mongoose");
const User = require("./models/User");

app.use(logger("dev"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //   useCreateIndex: true,
    //   useFindAndModify: false,
  })
  .then(() => {
    console.log("connect ...");
  })
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/register", (req, res) => {
  /**
   * 회원 가입 할때 필요한 정보들을 client에서 가져오면
   * 그것들을 데이터 베이스에 넣어준다.
   */

  const user = new User(req.body);

  user.save((err, doc) => {
    if (err) res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });

    console.log("what? ");
  });
});

app.listen(port, () => {
  console.log("listening at port:", port);
});
