/**
 * Created by danesmith on 11/11/15.
 */
var express = require("express");
var router = express.Router();
var bodyParser = require('body-parser');
var path = require('path');
var pg = require('pg');


var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/peer_wednesday';
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({expanded: true}));

router.route('/people')
    .get(function(req, res){

        var results =[];
        pg.connect(connectionString, function (err, client, done){
            var query = client.query('SELECT * FROM people');

            query.on('row', function(row){
                results.push(row);
            });
            query.on('end', function(){
                client.end();
                return res.json(results);
            });
            if (err) {
                console.log(err);
            }
        })
    })

    .post(function(req, res){
           var person = {
               name: req.body.name,
               location: req.body.location,
               favorite_number: req.body.favorite_number
           };

        pg.connect(connectionString, function(err, client){
            client.query("INSERT INTO people (name, location, favorite_number) VALUES ($1, $2, $3) RETURNING id", [person.name, person.location, person.favorite_number],
                function(err, result) {
                    if(err) {
                        console.log("Error inserting data: ", err);
                        res.send(false);
                    }

                    res.send(true);
                });
        })

    })
    .put(function(req, res){

        var deleteId = req.body[0].id;
        console.log(req.body[0].id);
        pg.connect(connectionString, function(err, client){
            client.query("DELETE FROM people WHERE id = ($1)", [deleteId], function(err, result){
                if(err) {
                    console.log("Error inserting data: ", err);
                    res.send(false);
                }

                res.send(true);
            });
        });
    });





router.get('/*', function(req, res){
    var file = req.params[0] || 'assets/views/index.html';
    res.sendFile(path.join(__dirname, "../public", file));
});

module.exports = router;

