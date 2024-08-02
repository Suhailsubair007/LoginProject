const express = require("express");
const app = express();
const hbs = require('hbs');
const nocache = require('nocache');
const session = require('express-session');

app.use(express.static('public'));
app.set('view engine', 'hbs');

const username = "admin@gmail.com";
const password = "12345678";

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
    secret: "suhail",
    resave: false,
    saveUninitialized: true,
}));

app.use(nocache());

app.get('/', (req, res) => {
    if (req.session.user) {
        res.render('home');
    } else {
        let errorMsg = req.session.passwordwrong ? "Invalid Credentials" : null;
        req.session.passwordwrong = false; // Reset the flag
        res.render('login', { msg: errorMsg });
    }
});

app.post('/verify', (req, res) => {
    console.log(req.body);

    if (req.body.username === username && req.body.password === password) {
        req.session.user = req.body.username;
        req.session.passwordwrong = false; 
        res.redirect('/home');
    } else {
        req.session.passwordwrong = true;
        res.redirect('/');
    }
});

app.get('/home', (req, res) => {
    if (req.session.user) {
        res.render('home');
    } else {
        res.redirect('/');
    }
});

app.get('/logout',(req,res)=>{
    req.session.destroy();
    res.redirect('/home');

});



app.listen(3000, () => console.log("Server running on port 3000"));
