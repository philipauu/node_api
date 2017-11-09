var router = require('express').Router();
module.exports = router;

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27000/test_db', {
    useMongoClient: true
});

router.use(function (req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

var Bear = require('./app/models/bear');
router.get('/', function (req, res) {
    console.log('getting route');
    res.json({
        message: 'hooray! welcome to our api!'
    });
});

router.route('/bears')

    // create a bear (accessed at POST http://localhost:3500/api/bears)
    .post(function (req, res) {
        console.log('trying to create bear');
        var bear = new Bear(); // create a new instance of the Bear model
        bear.name = req.body.name; // set the bears name (comes from the request)
        console.log(bear);

        // save the bear and check for errors
        bear.save(function (err) {
            console.log('trying to save bear');
            if (err)
                res.send(err);

            res.json({
                message: 'Bear created!'
            });
        });
    })

    .get(function (req, res) {
        console.log('trying to get all bears');
        Bear.find(function (err, bears) {
            if (err)
                res.send(err);

            res.json(bears);
        });
    });

    