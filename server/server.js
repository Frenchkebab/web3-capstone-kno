const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const PORT = process.env.port || 8000;
const bodyParser = require("body-parser");
const session = require('express-session')
const cookieParser = require('cookie-parser')

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "basicboard",
});

const sessionOption = {
  secret: "SECRET_KEY",
  resave: false,
  saveUninitialized: false
}


app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(session(sessionOption));

app.get("/list", (req, res) => {
  const sqlQuery = "SELECT * FROM post;";
  db.query(sqlQuery, (err, result) => {
    res.send(result);
  });
});


app.post("/post/question", (req, res) => {
  const title = req.body.title;
  const content = req.body.content;
  const author = req.body.author;
  const date = "111";
  const sqlQuery = "INSERT INTO post (TITLE, CONTENT, AUTHOR, DATE) VALUES (?,?,?,?)";

  db.query(sqlQuery, [title, content, author, date], (err, result) => {
    if(err)
    {res.send(err);}
    else
    {
      res.send("post success!");
    }
      
  });
});


app.get("/question/:idpost", (req, res) => {
  const sqlQuery = "SELECT * FROM post WHERE idpost= ? ";
  const id = req.params.idpost;
  db.query(sqlQuery, id, (err, result) => {

    if(err){
      console.log("접근할 수 없는 포스트입니다.");
      console.log(err);
      console.log(id);
    }
    else if(result.length != 0){
      res.send(result);
    }
  });
});



app.get("/answer/:idpost", (req, res) => {
  const sqlQuery = "SELECT * FROM answer WHERE idpost= ? ";
  const id = req.params.idpost;
  db.query(sqlQuery, id, (err, result) => {

    if(err){
      console.log(err);
    }
    else if(result.length != 0){
      res.send(result);
    }
  });
});

app.post("/accept/post", (req, res) => {
  
  const idpost = req.body.postId;
  console.log(idpost);
  const sqlPostQuery = "UPDATE post SET ACCEPTED = 'true' WHERE idpost= ?";

  db.query(sqlPostQuery, idpost, (err, result) => {
    if(err)
    {

        res.send(err);
    }
    else{

        res.send("accept post success!");
    }
      
  });

});


app.post("/accept/answer", (req, res) => {
  
  const idanswer = req.body.answerId;
  console.log(idanswer);
  const sqlAnswerQuery = "UPDATE answer SET ACCEPTED = 'true' WHERE idanswer= ? ";

  db.query(sqlAnswerQuery, idanswer, (err, result) => {
    if(err)
    {
        res.send(err);
    }
    else
    {
        res.send("accept answer success!");
    }
      
  });

});


app.get("/accept/answer/:idpost", (req, res) => {

  const idpost = req.params.idpost;
  const sqlAnswerQuery = "SELECT * FROM answer WHERE idpost = ? AND ACCEPTED = 'true' ";

  db.query(sqlAnswerQuery, idpost, (err, result) => {
    if(err)
    {
        res.send(err);
    }
    else
    {
        res.send(result);
    }
      
  });

});

app.post("/post/answer", (req, res) => {

  const answer = req.body.answer;
  const idpost = req.body.idpost;
  const author ="ddd"//req.session.user_id;
  const date = "111";

  const sqlQuery = "INSERT INTO answer (ANSWER, AUTHOR, DATE, idpost) VALUES (?,?,?,?)";

  db.query(sqlQuery, [ answer, author, date, idpost], (err, result) => {
    if(err)
    {
      res.send(err);
    }
    else
    {
      res.send("answer success!");
    }
      
  });
});


  
app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const sqlQuery = "SELECT * FROM user WHERE USERNAME= ? ";
  
  db.query(sqlQuery, [username], (err, result) => {

    if (result.length == 0) {
      console.log('wrong username');
      res.send('wrong username')
    }
    else
    {
      if (result[0].PASSWORD == password) {

        req.session.user = {
          id: username,
          authorized: true
        }
        console.log('login success');  
        res.send('login success');

      } else {

        console.log('wrong password');
        res.send('wrong password')

      }
      
    } 
  });
});

app.get("/logout", (req, res) => {

  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        console.log("세션 삭제시에 에러가 발생했습니다.");
      }else{
        console.log("세션이 삭제됐습니다.");
        res.send("logout success");
      }
    });
  } else {
    console.log("로그인 상태가 아닙니다.");
  }

})

app.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const sqlSearchQuery = "SELECT * FROM user WHERE USERNAME= ? ";
  const sqlInsertQuery = "INSERT INTO user (USERNAME, PASSWORD) VALUES (?,?)";

  db.query(sqlSearchQuery, [username], (err, result) => {
    if(err){
      console.log(err);
    }
    else if(result.length==0){
      db.query(sqlInsertQuery, [username, password]);
      console.log("register success");
    }
    else{
      console.log("username already exist");
    }
    
  });
});

  
app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});