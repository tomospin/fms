var Product = require('../models/product');
 
exports.getProducts = function(req, res, next){
 
    Product.find({'company': req.body.company}, function(err, products) {
 
        if (err){
            res.send(err);
        }
 
        res.json(products);
 
    });
 
}
 
exports.createProduct = function(req, res, next){
 
    Product.create({
        name : req.body.name,
        description: req.body.description,
        image: req.body.image,
        company: req.body.company,
        quantity: req.body.quantity,
        price: req.body.price
    }, function(err, product) {
 
        if (err){
            res.send(err);
        }
        Product.find({'company': req.body.company}, function(err, products) {
 
            if (err){
                res.send(err);
            }
 
            res.json(products);
 
        });
 
    });
 
}
 
exports.deleteProduct = function(req, res, next){
 
    Product.remove({
        _id : req.params.product_id
    }, function(err, product) {
        res.json(product);
    });
 
}