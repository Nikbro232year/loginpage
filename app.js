
<<<<<<< HEAD
const express = require('express');
const app = express();

const userModel = require("./models/users");
const path = require('path');

const cookieParser = require('cookie-parser');

app.set("view engine", "ejs");
app.use(express.json());

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { hash } = require('crypto');

app.use(express.urlencoded({ extended: true }));
//app.use(express.static(path.join(_dirname,'public')));
app.use(cookieParser());

app.get('/', (req, res) => {
    res.render('index');
});
app.post('/create', async (req, res) => {
    let { username, email, password, age } = req.body;
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
            let createduser = await userModel.create({
                username,
                email,
                password: hash,
                age
            })
            let token = jwt.sign({ email }, "skdlfjkdslafk");//login
            res.cookie("token", token);
           res.render('login')
            //res.send(createduser);
        })
    })


});
app.get('/login', function (req, res) {
    res.render('login');
})

app.post('/login', async function (req, res) {
    let user = await userModel.findOne({ email: req.body.email });
    if (!user) return res.send("something went wrong !");

    bcrypt.compare(req.body.password, user.password, function (err, result) {
        if (result) {
            res.send("you can login");
            let token = jwt.sign({ email: user.email }, "skdlfjkdslafk");//login
            res.cookie("token", token);

        }
        else res.send("wrong pass")
    })
})
app.get("/logout", function (req, res) {
    res.cookie("token", "");
    res.redirect('/');
})
=======
/*const cookieParser = require('cookie-parser');
const express=require('express');
const bcrypt=require('bcrypt');
const jwt = require('jsonwebtoken');
const app=express();
app.use(cookieParser());

app.get('/',function(req,res){
    res.cookie("name","harshal");//set->resp

    res.send("done");
})

app.get('/read',function(req,res){
    console.log(req.cookie);//read-->req,
    res.send("read page");
})


app.get('/',function(req,res){
  bcrypt.genSalt(10,function(err,salt){
    bcrypt.hash('nikhilahire',salt,function(err,hash){
        //store hash in your pasw db
        console.log(hash);
    })
  })
});

app.get('/',function(req,res){

    bcrypt.compare("nikhilahire","$2b$10$x.FpT831gzrl85zMOMMfWOXGQwf040ayNsRq.AC8hpfLrV0aATn7K",function(err,result){
        console.log(result)
    })
})
app.get('/',function(req,res){
    let token=jwt.sign({email:"nikhil@example.com"},"scret");
    res.cookie("token",token)
  //  console.log(token)
   res.send("done")
})
app.get("/get",function(req,res){
    let data=jwt.verify(req.cookie.token,"scret");
    console.log(data);
})
    */



const path=require('path');
app.set("view engine","ejs");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(_dirname,'public')));
(
app.get('/',(req,res)=>{
    res.send('welcome');
}))
>>>>>>> 6af1df7e60d053a52dc0e870cfe3bc8ef1b8beaf
app.listen(3000); 