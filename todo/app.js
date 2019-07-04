var express= require("express");
var sql= require("../db/db");
var bodyparser= require("body-parser");
const app= express();

app.get('/api/todos',function(req,res1){
   sql.query("select * from todos",function(err,res){
    if(err){
        res1.status(404).send({message:"No ToDo Found"});
    }
    else{
        res1.send(res);
    }
   })
});
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));

app.post('/api/todos',function(req,res1){
   if(!req.body.title && !req.body.description){
      res1.status(400).send({"title":"Please provide Title","description":"Please provide description"});
   }
  else if(!req.body.title ){
      res1.status(400).send({"title":"Please provide Title"});
   }
   else if(!req.body.description){
    res1.status(400).send({"description":"Please provide Description"});
   }
   else{
   sql.query("Insert into todos set ?",req.body,function(err,res){
      
            res1.send(res);
        
   });
              
}
    

});

app.get('/api/todos/:id',function(req,res1){
   sql.query("select * from todos where id = ?",req.params.id,function(err,res){
       if(err)
       res1.send(err)
        else
        res1.send(res);
   })
   
  
});

app.delete('/api/todos/:id',function(req,res1){
   sql.query("delete from todos where id =?",req.params.id,function(err,res){
    if(err)
       res1.send(err)
        else
        res1.send(res);
   })
});

app.post('/api/todos/:id',function(req,res1){
   sql.query("update todos set title= ? ,description =? where id=?",[req.body.title,req.body.description,req.params.id],function(err,res){
    if(err)
    if(!req.body.title){
      res1.status(400).send({message:"Please Provide Title"});
   }
   if(!req.body.description){
    res1.status(400).send({message:"Please Provide Description"});
   }
   
     else
     res1.send(res);
   })
   
})



module.exports=app;