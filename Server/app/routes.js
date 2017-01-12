// app/routes.js
var Pilot = require('./models/pilots');
var Document = require('./models/documents');
var Course = require('./models/Courses');
var Company = require('./models/Company');
var Workflow=require('./models/WorkFlow');
    module.exports = function(app) {

      ///documents  
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
    app.put('/api/documents',function(req,res)
    {
        var query = req.body.target;
        var updatepart = req.body.updatepart;
        console.log("updatepart:",req.body.updatepart);
        Document.findOneAndUpdate(query,updatepart,function(err,data)
            {
               if(err)
                            res.send(err);
                        res.send("update success");
            }
            );
    });

  app.delete('/api/documents',function(req,res){
        var query = req.body.target;
        Document.findOneAndRemove(query,function(err,data)
            {
               if(err)
                            res.send(err);
                        res.send("delete success");
            }
            );
  });

//endof documents


// pilots operations
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


      app.post('/api/pilots', function(req, res) {
        var newOne = new Pilot(req.body);
        console.log("req.body is",req.body);
        newOne.save(function(err){
                if(err)
                {    console.log(err);
                    res.send(false);  
                }
        })
        res.send(true);

        });

  app.put('/api/pilots',function(req,res)
    {

        var query = req.body.data.target;
        var updatepart = req.body.data.updatepart;
        Pilot.findOneAndUpdate(query,updatepart,function(err,data)
            {
               if(err)
                            res.send(err);
                        res.send("update success");
            }
            );
    });

  app.delete('/api/pilots',function(req,res){
      console.log(req.body)
        var query = req.body.target;
        Pilot.findOneAndRemove(query,function(err,data)
            {
               if(err)
                            res.send(err);
                        res.send("delete success");
            }
            );
  });

//end of pilot operations

//Courses
     app.get('/api/courses', function(req, res) {
            Course.find(req.query,function(err, pilots) {
                // if there is an error retrieving, send the error. 
                                // nothing after res.send(err) will execute
                if (err)
                    res.send(err);
                res.json(pilots); // return all nerds in JSON format
            });

            });


      app.post('/api/courses', function(req, res) {
        var newOne = new Course(req.body);
        newOne.save(function(err){
                if(err)
                {    console.log(err);
                    res.send(false);  
                }
        })
        res.send(true);

        });

  app.put('/api/courses',function(req,res)
    {
        var query = req.body.target;
        var updatepart = req.body.updatepart;
        Course.findOneAndUpdate(query,updatepart,function(err,data)
            {
               if(err)
                            res.send(err);
                        res.send("update success");
            }
            );
    });

  app.delete('/api/courses',function(req,res){
      console.log(req.body)
        var query = req.body.target;
        Course.findOneAndRemove(query,function(err,data)
            {
               if(err)
                            res.send(err);
                        res.send("delete success");
            }
            );
  });

//end of Courses


//company 

     app.get('/api/companys', function(req, res) {
            Company.find(req.query,function(err, pilots) {
                // if there is an error retrieving, send the error. 
                                // nothing after res.send(err) will execute
                if (err)
                    res.send(err);
                res.json(pilots); // return all nerds in JSON format
            });

            });


      app.post('/api/companys', function(req, res) {
        var newOne = new Company(req.body);
        newOne.save(function(err){
                if(err)
                {    console.log(err);
                    res.send(false);  
                }
        })
        res.send(true);

        });

  app.put('/api/companys',function(req,res)
    {
        var query = req.body.target;
        var updatepart = req.body.updatepart;
        Company.findOneAndUpdate(query,updatepart,function(err,data)
            {
               if(err)
                            res.send(err);
                        res.send("update success");
            }
            );
    });

  app.delete('/api/companys',function(req,res){
      console.log(req.body)
        var query = req.body.target;
        Company.findOneAndRemove(query,function(err,data)
            {
               if(err)
                            res.send(err);
                        res.send("delete success");
            }
            );
  });

//end of companys


// Workflow
     app.get('/api/workflows', function(req, res) {
            Workflow.find(req.query,function(err, pilots) {
                // if there is an error retrieving, send the error. 
                                // nothing after res.send(err) will execute
                if (err)
                    res.send(err);
                res.json(pilots); // return all nerds in JSON format
            });

            });


      app.post('/api/workflows', function(req, res) {
        var newOne = new Workflow(req.body);
        newOne.save(function(err){
                if(err)
                {    console.log(err);
                    res.send(false);  
                }
        })
        res.send(true);

        });

  app.put('/api/workflows',function(req,res)
    {
        var query = req.body.target;
        var updatepart = req.body.updatepart;
        Workflow.findOneAndUpdate(query,updatepart,function(err,data)
            {
               if(err)
                            res.send(err);
                        res.send("update success");
            }
            );
    });

  app.delete('/api/workflows',function(req,res){
      console.log(req.body)
        var query = req.body.target;
        Workflow.findOneAndRemove(query,function(err,data)
            {
               if(err)
                            res.send(err);
                        res.send("delete success");
            }
            );
  });

        app.post('/api/login', function(req, res){
    // attempt automatic login //
            console.log("fdsafdsafsda",req.body.cert_id);
            Pilot.findOne({cert_id:req.body.cert_id},function(e, o,callback){
                // if there is an error retrieving, send the error. 
                                // nothing after res.send(err) will execute
                if (o==null)
                {
                    res.send('未找到该用户');
                }
                else{
                    if(o.password == req.body.password)
                    {
                        res.json(o);
                    }
                    else
                        res.send("密码错误");
                } 
            }
            );            
            // Pilot.find(req.query,function(err, pilots) {
            //     // if there is an error retrieving, send the error. 
            //                     // nothing after res.send(err) will execute
            //     if (err)
            //         res.send(err);
            //     res.json(pilots); // return all nerds in JSON format
            // });
            // if (true){
            // res.redirect('/');
            // } else{
            // res.render('login', { title: 'Hello - Please Login To Your Account' });
            // }
            
    });


// end of workflows


        app.get('*', function(req, res) {
            res.render('index'); // load our public/index.html file
        });




    };

  