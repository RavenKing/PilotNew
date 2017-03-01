// app/routes.js
var Pilot = require('./models/pilots');
var Document = require('./models/documents');
var Course = require('./models/Courses');
var Company = require('./models/Company');
var Workflow=require('./models/WorkFlow');
var Level = require('./models/Level');
var Message = require('./models/Message');
var multer  = require('multer');
var upload = require('./upload');
var uploadExcel = require('./flightsupload')
var xlstojson = require("xlsx-to-json-lc");


    module.exports = function(app) {

      ///documents  
    app.get('/api/documents', function(req, res) {
            Document.find(req.query,function(err, documents) {
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
        var query = req.body.data.target;
        var updatepart = req.body.data.updatepart;
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

         app.post('/api/pilots/query', function(req, res) {
     var data = req.body.data;
     console.log(data);
     var newquery = JSON.parse(data);
     console.log(newquery);

     Pilot.find(newquery,function(err,pilots){
            if (err)
                    res.send(err);
         res.json(pilots);

     })

     });




     app.get('/api/pilots', function(req, res) {
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

                if(updatepart.flightTime)
                {
                 var total = parseInt(data.flightinfo.flightTime) + parseInt(updatepart.flightTime);
                  data.flightinfo.flightTime = total; 
                }
                if(updatepart.flightRoute)
                {
                 var totalRoute = parseInt(data.flightinfo.flightRoute) + parseInt(updatepart.flightRoute);
                 data.flightinfo.flightRoute = totalRoute;    
                }   
                if(updatepart.flightRealTime)
                {
                var totalflightRealTime = parseInt(data.flightinfo.flightRealTime) + parseInt(updatepart.flightRealTime);
                 data.flightinfo.flightRealTime = totalflightRealTime; 
                }
                 if(updatepart.flightRealRoute)
                {
                var totalflightRealRoute = parseInt(data.flightinfo.flightRealRoute) + parseInt(updatepart.flightRealRoute);
                 data.flightinfo.flightRealRoute = totalflightRealRoute; 
                }
                if(updatepart.flightTotalTime)
                {
                var totalflightTotalTime = parseInt(data.flightinfo.flightTotalTime) + parseInt(updatepart.flightTotalTime);
                 data.flightinfo.flightTotalTime = totalflightTotalTime; 
                }
 
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

        var query = req.body.target;
        console.log(query);
        Pilot.findOneAndRemove(query,function(err,data)
            {
               if(err)
                            res.send(err);
                        console.log(data);
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


     app.get('/api/levelinfo', function(req, res) {
        console.log(req.query);
            Level.findOne(req.query,function(err, level) {
                // if there is an error retrieving, send the error. 
                                // nothing after res.send(err) will execute
                if (err)
                    res.send(err);
                res.json(level); // return all nerds in JSON format
            });

            });


     app.get('/api/levels', function(req, res) {
        console.log(req.query);
            Level.findOne({name:"default"},function(err, pilots) {
                // if there is an error retrieving, send the error. 
            if (err)
                    res.send(err);
            else
            {    if(req.query.level)
                {
                    var data ={};
                    if(req.query.level)
                    {

                        for(var i =0;i<pilots.entries.length;i++)
                        {
                                if(req.query.level == pilots.entries[i].level)
                                    data = pilots.entries[i];

                        }
                    res.json(data);
                    }

                }
                else
                  {           // nothing after res.send(err) will execute
                res.json(pilots);
                  } // return all nerds in JSON format
            }
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
//message

        app.get('/api/message', function(req, res) {
            Message.find(function(err, messages) {
                // if there is an error retrieving, send the error. 
                                // nothing after res.send(err) will execute
                if (err)
                    res.send(err);
                res.json(messages); // return all nerds in JSON format
            });

        });



        app.post('/api/message', function(req, res) {
        var newOne = new Message(req.body.data);
        newOne.save(function(err){
                if(err)
                {    console.log(err);
                    res.send(false);  
                }
        })
        res.send(true);
        });


        app.put('/api/message',function(req,res)
    {
        var query = req.body.data.target;
        var updatepart = req.body.data.updatepart;
        Message.findOneAndUpdate(query,updatepart,function(err,data)
            {
               if(err)
                            res.send(err);
                        res.send("update success");
            }
            );
    });
//end of message

//upload to excel 


    app.post('/api/upload_flight',uploadExcel.single('flightinfo'),function(req,res,next)
    {

       // console.log(req.file);
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
                var newResult = [];
                // 遍历result 

                if(result.length>0)
                 {   

                  result.filter((one)=>{
                         // find each
                        if(one.cert_id)
                        {
                            Pilot.findOne({cert_id:one.cert_id},function(err,data){

                                          if(err)
                                                return;

                                        if(data)  
                                        {if(data.flightinfo)
                                        {
                                        
                                            if(one.flightTime)
                                            {var origin = data.flightinfo.flightTime;
                                            var total = parseInt(data.flightinfo.flightTime) + parseInt(one.flightTime);
                                    
                                              one.OriginFlightTime = origin;
                                              one.UpdatedFlightTime = total; 
                                             }                            
                                            if(one.flightRoute)
                                            {
                                             var totalRoute = parseInt(data.flightinfo.flightRoute) + parseInt(one.flightRoute);
                                             one.OriginFlightRoute= data.flightinfo.flightRoute;
                                             one.UpdatedflightRoute = totalRoute;    
                                            }   
                                            if(one.flightRealTime)
                                            {
                                            var totalflightRealTime = parseInt(data.flightinfo.flightRealTime) + parseInt(one.flightRealTime);
                                            one.OriginflightRealTime = data.flightinfo.flightRealTime;
                                            one.UpdatedflightRealTime = totalflightRealTime; 
                                            }
                                             if(one.flightRealRoute)
                                            {
                                            var totalflightRealRoute = parseInt(data.flightinfo.flightRealRoute) + parseInt(one.flightRealRoute);
                                             one.OriginFlightRealRoute = data.flightinfo.flightRealRoute;
                                             one.UpdatedflightRealRoute = totalflightRealRoute; 
                                            }
                                            if(one.flightTotalTime)
                                            {
                                            var totalflightTotalTime = parseInt(data.flightinfo.flightTotalTime) + parseInt(one.flightTotalTime);
                                              one.OriginFlightTotalTime = data.flightinfo.flightTotalTime;
                                              one.UpdatedflightTotalTime = totalflightTotalTime; 
                                            }
                                          newResult.push(one);   
                                          console.log("done");
                                       }
                                       }
                            });
                            return one;
                        }
                // add and push 
                    });
                 }
                console.log(newResult);

                setTimeout(function(){console.log(newResult)

                        res.json({error_code:0,data:newResult})

                    },2000);
        
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

  