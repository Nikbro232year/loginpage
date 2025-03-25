
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
app.listen(3000); 