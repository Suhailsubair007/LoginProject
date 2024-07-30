const express = require("express");
const app = express();
const hbs = require('hbs');
const nocache =require('nocache')
const session = require('express-session');

app.use(express.static('public'));
app.set('view engine','hbs');

const username ="admin"
const password = "12345678"
app.use(express.urlencoded({extended:true}));
app.use(express.json()) 


app.use(session({
    secret:"keyboard cat",
    resave: false,
    saveUninitialized:true,
}))

app.use(nocache());

app.post('/verify',(req,res)=>{
    console.log(req.body);
    
    if(req.body.username === username && req.body.password === password)
    {
        req.session.user = req.body.username
        res.render('home');
    } else 
    {
        res.render('login',{msg:"Invalid credentials"});
    }

})

app.get('/', (req,res)=>{
    if(req.session.user)
    {
        res.render('home');
    } else {
        res.render('login')
    }
})
app.listen(3000 ,() => console.log("Server running on port 3000"));