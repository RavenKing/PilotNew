// app/routes.js
var Pilot = require('./models/pilots');
var Document = require('./models/documents');
var Course = require('./models/Courses');
var Company = require('./models/Company');
var Workflow=require('./models/WorkFlow');
var Level = require('./models/Level');
//upload function 
var multer  = require('multer');

var upload = require('./upload');

var uploadExcel = require('./flightsupload')



var xlstojson = require("xlsx-to-json-lc");


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
        var newOne = new Document(req.body.data);
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
  app.put('/api/flightUpdate',function(req,res)
    {

        var query = req.body.data.target;
        var updatepart = req.body.data.updatepart;
        Pilot.findOne(query,function(err,data)
            {
                if(err)
                            res.send(err);

                if(data)  
                {if(data.flightinfo)
                {
                var origin = data.flightinfo.flightTime;
                var updateTime = updatepart.flightTime;
                console.log("origin:"+data.flightinfo.flightTime);
                console.log("update:"+updatepart.flightTime);
                var total = parseInt(data.flightinfo.flightTime) + parseInt(updatepart.flightTime);
                console.log(total);
                 data.flightinfo.flightTime = total;    
                    data.save();
                    res.json(data);
               }
            }
               else
               {
                res.send("no")
               }

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
        var newOne = new Course(req.body.data);
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
        var query = req.body.data.target;
        var updatepart = req.body.data.updatepart;
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
        var newOne = new Company(req.body.data);
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
        var query = req.body.data.target;
        var updatepart = req.body.data.updatepart;
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
        var query = req.body;
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
        var query = req.body.data.target;
        var updatepart = req.body.data.updatepart;
        console.log(req.body);
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


//levels




     app.get('/api/levels', function(req, res) {
        console.log(req.query);
            Level.findOne({name:"default"},function(err, pilots) {
                // if there is an error retrieving, send the error. 
                                // nothing after res.send(err) will execute
                if (err)
                    res.send(err);
                res.json(pilots); // return all nerds in JSON format
            });

            });


      app.post('/api/levels', function(req, res) {
        var newOne = new Level(req.body.data);
        newOne.save(function(err){
                if(err)
                {    console.log(err);
                    res.send(false);  
                }
        })
        res.send(true);

        });

  app.put('/api/levels',function(req,res)
    {
        var query = req.body.data.target;
        var updatepart = req.body.data.updatepart;
        var options= {upsert:true}
        console.log(query)
        console.log(updatepart)
        console.log("good now")
        Level.findOneAndUpdate(query,updatepart,options,function(err,data)
            {
               if(err)
                        res.send(err);
                        res.send("update success");
            }
            );
    });

  app.delete('/api/levels',function(req,res){
      console.log(req.body)
        var query = req.body;
        Level.findOneAndRemove(query,function(err,data)
            {
               if(err)
                            res.send(err);
                        res.send("delete success");
            }
            );
  });

//end of levels

// upload

    app.post('/api/upload_course',upload.single('attachments'),function(req,res,next)
    {
        if (req.file) {
        res.send(req.file)
    
    }
    });






// end of upload



//upload to excel 


    app.post('/api/upload_flight',uploadExcel.single('flightinfo'),function(req,res,next)
    {

        console.log(req.file);
        if (req.file) {
            console.log(req.file.path);
        try{
            xlstojson({
                input:req.file.path,
                output:null,
                lowerCaseHearders:true
            },function(err,result){
                if(err)
                {
                    return res.json({error_code:1,err_des:err,data:null})
                }
                console.log(result);
                res.json({error_code:0,data:result})
            });
        }
         catch(e)
         { 
            res.json({error_code:1,error_desc:"shit "})
         }
     }
});


//end of upload to excel 


        app.get('*', function(req, res) {
            res.render('index'); // load our public/index.html file
        });




    };

  