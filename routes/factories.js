var express = require('express');
var factoryStore = require('json-fs-store')('store/companies/factories');
var router = express.Router();

/* GET a list of factories */
router.get('/', function(req, res, next) {
    factoryStore.list(function(err, factories) {
        if (err) throw err;

        res.json(factories);
    });
});
router.get('/:id', function(req, res, next) {
    factoryStore.load(req.params.id, function(err, factory) {
        if (err) throw err;

        res.json(factory);
    });
});
router.post('/', function(req, res, next) {
    if (!req.body) return res.sendStatus(400);

    var newFactory = {
        company_type: req.body.company_type,
        name: req.body.name,
        email: req.body.email,
        phone_number: req.body.phone_number,
        City: req.body.City,
        State: req.body.State
    };
    factoryStore.add(newFactory, function(err) {
        if (err) throw err;

        res.json(newFactory);
    });
});

router.delete('/:id', function(req, res, next) {
    factoryStore.remove(req.params.id, function(err, brand) {
        if (err) throw err;
    });
});

module.exports = router;
