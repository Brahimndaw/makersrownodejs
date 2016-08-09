var express = require('express');
var brandStore = require('json-fs-store')('store/companies');
var router = express.Router();

/* GET a list of brands */
router.get('/', function(req, res, next) {
    brandStore.list(function(err, brands) {
        if (err) throw err;

        res.json(brands);
    });
});
router.get('/:id', function(req, res, next) {
    brandStore.load(req.params.id, function(err, brand) {
        if (err) throw err;

        res.json(brand);
    });
});
router.post('/', function(req, res, next) {
    if (!req.body) return res.sendStatus(400);

    var newBrand = {
        name: req.body.name
    };
    brandStore.add(newBrand, function(err) {
        if (err) throw err;
        res.json(newBrand);
    });
});

router.delete('/:id', function(req, res, next) {
    brandStore.remove(req.params.id, function(err, brand) {
        if (err) throw err;

        res.json(brand);
    });
});

module.exports = router;
