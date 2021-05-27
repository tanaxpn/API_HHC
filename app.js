const express = require('express')
const app = express()
const port = process.env.PORT || 80;  // port
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
global.resource = require('./resources/menu');
global.sha1 = require('sha1')
global.jwt = require('jsonwebtoken');
var favicon = require('serve-favicon');
global._ = require('lodash');
global.hhcFunc = require('./libServer/hhcFunction')

const mysql = require('mysql');
global.pool = mysql.createPool({
    connectionLimit : 300,
    host     : 'localhost',
    user     : 'hhc',
    password : 'hhc',
    database : 'hhc',
    debug    :  false
});
global.tokenVerify = function(token,callback){
    jwt.verify(token,'secrethhc', function(err, decoded) {
        callback(err, decoded);
    });
};
app.set('port', port);
app.set('views', path.join(__dirname,'views'));
app.set('view engine','ejs');
app.use(favicon(__dirname + '/public/img/HHC_icon.png'));
app.use(bodyParser.urlencoded({extend:true}));
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(cookieParser());

app.use('*', function (req,res,next) {
    res.setHeader('Access-Control-Allow-Orignin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

const controller = require('./controller')(app);
const api = require('./api')(app);

const server = http.createServer(app).listen(app.get('port'),function(){
    console.log(`HCC app listening on port ${port}!`);
});


global.checkToken = function(req,res,obj){
    if(req.cookies.token != "" && req.cookies.token != undefined){
        tokenVerify(req.cookies.token,function(err, decoded){
            if (err) {
                res.redirect('/login');
            }else{
                if(!decoded.loginStatus){
                    res.redirect('/login');
                }else {
                    res.render(obj.page,{title:obj.title,userName:decoded.userName,menu:resource({rule:decoded.userStatus})});
                }
            }
        });
    }else{
        if(req.cookies.admin == 'poont'){
            res.render(obj.page,{title:obj.title,personal:'poont',menu:resource});
        }else{
            res.redirect('/login');
        }
    }

}
