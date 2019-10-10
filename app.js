
const path=require('path');
const express=require('express');
const bodyParser=require('body-parser');

//creates an express appliaction
//this app will store logic and other stuff behind the scences
const app=express();

//imports router object from the routes folder.
const adminRoutes=require('./routes/admin')
const shopRoutes=require('./routes/shop');

//automattically consider routes in admin folder
//still works like a folder.
app.use(bodyParser.urlencoded({extended:false}));
app.use('/admin',adminRoutes);//all routes will go through /admin/ 
app.use(shopRoutes);


//registers middleware that parsers bodies through a form

//catch all error message
app.use((req,res,next)=>{
    res.status(404).sendFile(path.join(__dirname,'views','404.html'));
});

//req are like funnles we go through them from one to another running through middleware
//until you run into a response
//const server=http.createServer(app);

app.listen(3000);

//middle