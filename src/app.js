const express = require('express')
const fs = require('fs')
const app = express()
app.get('/',function(req,resp){
   // resp.writeHead(200,{'content-type':'text/html'});   
fs.readFile("src/html/index.html",function(err,data){
   resp.send(data.toString())
  
    });
    //resp.send("<h1>hi</h1>")
});
app.get('/api/todos',function(req,res){
    fs.readFile("src/todos.json",function(err,data){
        res.send(data.toString())
    });
    });
    app.get('/api/todos/add',function(req,res){
        console.log(req.query);
        if(req.query.todoname!=""){
            var todoName = req.query.todoname;
            console.log('There is a valid todo data');
            console.log(todoName);

            fs.readFile("src/todos.json",function(err,todosData){
                var todoListData = JSON.parse(todosData);
                console.log(todoListData);
                todoListData.data.push({"title":todoName,"checked":false});
                fs.writeFile("src/todos.json",JSON.stringify(todoListData),function(err,data){
                    res.send('saved new todo data'+todoName);
                });

            });
           
        }else{
            res.send('No valid todo data');
        }
        
            });

app.listen(3000,function(){
    console.log("Server Started")
})