const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/product.model');
const config = require('../db/config');

//Connect MongoDB Database
mongoose.connect(config.DB, { useNewUrlParser: true, useUnifiedTopology: true });

let db = mongoose.connection;

db.once('open', function (err) {
    console.log('Connection open with MONGOdb Server!');
});

db.on('error', function (err) {
    console.log("Error : " + err.stack);
});

//GET/ api/ users
router.route('/').get(function (req, res) {
    Product.find(function (err, products) {
        if (err) {
            res.status(500).json(err.stack);
            return
        }
        res.status(200).json(products);
    });
});

router.route('/:id')
    .get(function (req, res) {
        Product.findById(req.params.id, { _v: 0 },
            function (err, product) {
                if (err) {
                    res.status(500).json(err.stack);
                    return
                }
                res.status(200).json(product);

            });
    });

//create - post -/api/users

router.route('/').post(function (req, res) {

    var product = new Product();
    product.productId = req.body.productId;
    product.productName = req.body.productName;
    product.description = req.body.description;
    product.price = req.body.price;
    product.quantity = req.body.quantity;
    product.customerName = req.body.customerName;
    product.address = req.body.address;
    product.mobileNumber = req.body.mobileNumber;

    product.save(function (err) {
        if (err) {
            res.status(500).json(err.stack);
            return;
        }
        console.log("added");
        res.status(200).json({ message: 'Product Created !' })
    })
});

// export all routes
module.exports = router;

//delete/ api/users/1
router.route('/:id').delete(function (req, res) {
    //remove)(), findByIdAndRemove(), deleteOne()
    Product.remove({ _id: req.params.id },
        function (err, product) {
            if (err) {
                res.status(500).json(err.stack);
                return;
            }
            res.status(200).json({ message: 'Product successfully deleted' });
        })
})


//update - put/api/ users/1

router.route('/:id').put(function (req, res) {
    Product.findById(req.params.id, function (err, product) {
        if (err) {
            res.status(500).json(err.stack);
            return;

        }
        product.productId = req.body.productId;
        product.productName = req.body.productName;
        product.description = req.body.description;
        product.quantity = req.body.quantity;
        product.price = req.body.price;
        product.customerName = req.body.customerName;
        product.address = req.body.address;
        product.mobileNumber = req.body.mobileNumber;
        product.save(function (err) {
            if (err) {
                res.status(500).json(err.stack);
                return;
            }
            res.status(200).json({ message: 'Product updated!' })
        });
    });
});

module.exports = router;
