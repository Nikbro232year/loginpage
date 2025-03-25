
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
app.listen(3000); 