// app/routes.js
var Pilot = require('./models/pilots')
var Document = require('./models/documents')

// grab the nerd model we just created
var Nerd = require('./models/pilot');
var Test = require('./models/pilot');
var personalInfo = require('./models/pilot');
var Kevin = new Nerd({name:'Kevin'});
// var Frank = new personalInfo({
//     userId:'001',
//     name:'Frank',
//     pass:'1234',
//     role:'Pilot',
//     level:{
//         current_level:'F0',
//         target_level:'F1'
//         }
//     });

    module.exports = function(app) {
         app.get('/api/documents', function(req, res) {
            Document.find(function(err, documents) {
                // if there is an error retrieving, send the error. 
                                // nothing after res.send(err) will execute
                if (err)
                    res.send(err);
                res.json(documents); // return all nerds in JSON format
            });

        });

         app.post('/api/documents', function(req, res) {
        var newOne = new Document(req.body);
        newOne.save(function(err){
                if(err)
                {  
                   console.log(err);
                    res.send(false);  
                }
        })
        res.send(true);

        });

     app.get('/api/pilots', function(req, res) {

        console.log(req.query);

            Pilot.find(req.query,function(err, pilots) {
                // if there is an error retrieving, send the error. 
                                // nothing after res.send(err) will execute
                if (err)
                    res.send(err);
                res.json(pilots); // return all nerds in JSON format
            });

            });

            app.post('/api/post', function(req, res) {
            console.log(req.body);
            res.header("Access-Control-Allow-Origin","*");
            var reg = new personalInfo(req.body);
            reg.save(function(err,silence)
            {
              if (err)
                    res.send(err);
            });
            // use mongoose to get all nerds in the database
            personalInfo.find(function(err,personalInfos) {
                // if there is an error retrieving, send the error. 
                                // nothing after res.send(err) will execute
                if (err)
                    res.send(err);
                            console.log(personalInfos);
                console.log(personalInfos);
                res.json(personalInfos); // return all nerds in JSON format
            });
        });
      app.post('/api/pilots', function(req, res) {
        console.log(req.body);
        var newOne = new Pilot(req.body);
        newOne.save(function(err){
                if(err)
                {    console.log(err);
                    res.send(false);  
                }
        })
        res.send(true);

        });
        app.get('*', function(req, res) {
            res.sendfile('./public/views/index.html'); // load our public/index.html file
        });

    };
