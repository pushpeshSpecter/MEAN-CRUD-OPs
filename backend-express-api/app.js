const express = require('express');
const bodyParser = require('body-parser');
const routeProducts = require('./routes/product.routes');
const routeUsers = require('./routes/user.routes');
const cors= require('cors');
var passport = require('passport')
const app = express();

// middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static(__dirname));
app.use(cors());

//enabling passport authentication for routes
app.use(passport.initialize());
app.use(passport.session());


//defining route
app.use('/api/products', routeProducts);
app.use('/api/users', routeUsers);

//starting server
const PORT = process.env.PORT || 3000;
app.listen(PORT, function(){
    console.log('Node.js server is running on port' + PORT);   
});
