var AuthenticationController = require('./controllers/authentication'),  
    ProductController = require('./controllers/products'),  
    express = require('express'),
    passportService = require('../config/passport'),
    passport = require('passport');
 
 
var requireAuth = passport.authenticate('jwt', {session: false}),
    requireLogin = passport.authenticate('local', {session: false, failureFlash: true});
 
module.exports = function(app){
 
    var apiRoutes = express.Router(),
        authRoutes = express.Router(),
        productRoutes = express.Router();
 
    // Auth Routes
    apiRoutes.use('/auth', authRoutes);
 
    authRoutes.post('/register', AuthenticationController.register);
    authRoutes.post('/login', requireLogin, AuthenticationController.login);
 
    authRoutes.get('/protected', requireAuth, function(req, res){
        res.send({ content: 'Success'});
    });
 
    // Product Routes
    apiRoutes.use('/products', productRoutes);
 
    productRoutes.post('/show', requireAuth, AuthenticationController.roleAuthorization(['owner','minor']), ProductController.getProducts);
    productRoutes.post('/', requireAuth, AuthenticationController.roleAuthorization(['owner']), ProductController.createProduct);
    productRoutes.delete('/:product_id', requireAuth, AuthenticationController.roleAuthorization(['owner']), ProductController.deleteProduct);
 
    // Set up routes
    app.use('/api', apiRoutes);
 
}