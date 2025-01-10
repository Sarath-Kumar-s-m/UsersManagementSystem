/**
 * Module Dependencies
 */
const express = require('express');
const session = require('express-session');
const noCache = require('nocache');
const path = require('node:path');
const morgan = require('morgan');


/**
 * Custome Dependencies
 */
const adminRoutes = require('./routes/routes.admin.js');
const userRoutes = require('./routes/routes.user.js');
const dataBaseConnection = require('./database/connections/connect.js');
const initialRoutes = require('./routes/routes.initial.js');
const rootRoutes = require('./routes/routes.root.js')


/**
 * Application object Initialization
 */

let app = express();

let PORT = process.argv[2] || 3000;
let hostName = 'localhost';
let backLog = null;

app.use(morgan(`[HTTP: :http-version]-[METHOD: :method]-[URL: :url]-[STATUS: :status]-[RESPONSELength: :res[content-length]]-[RESPONSE-TIME: :response-time ms]-[DATE: :date[web]]\n`));

app.set('view engine', 'ejs');

app.use(noCache());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));


app.use(session({
    secret:'secret', 
    resave: false,
    saveUninitialized: false,
    store: undefined,
    cookie: {
        path:'/',
        httpOnly: true,
        secure: false,
        maxAge: 1000 * 60 * 60,
    }
}))


app.use('/', rootRoutes)
app.use('/', initialRoutes)
app.use('/', adminRoutes);
app.use('/', userRoutes);

app.use('*', (req, res) =>{
    res.status(404).send(`<h1> Page Not Found !!</h1>`)
})


dataBaseConnection();

app.listen(PORT,hostName,backLog, (error) => {
     if(error){
        throw error;
     }else {
        console.log({
            serverState: 'Running........',
            port: PORT,
            backlog: backLog
        })
     }
})
