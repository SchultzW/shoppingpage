
const path=require('path');
const express=require('express');
const bodyParser=require('body-parser');



//creates an express appliaction
//this app will store logic and other stuff behind the scences
const app=express();

////////////////view engine info/////////////////////////////////////////////
//app.engine('handlebars',expressHbs({layoutDir:'views/layouts',defaultLayout:'main-layout'}));//func that initilized engine and then assign it
//app.set('view engine','pug');
app.set('view engine','ejs');
//explicitly tells app where to look for views. Default is views so dont actually need to do this just fyi
app.set('views','views')
//////////////////////////////////////////////////////////////

//staticialy served means not handled by express or middleware
//directly fowarded to file system.
//we need this to access css files
app.use(express.static(path.join(__dirname,'public')));

//imports router object from the routes folder.
const adminData=require('./routes/admin')
const shopRoutes=require('./routes/shop');

//automattically consider routes in admin folder
//still works like a folder.
app.use(bodyParser.urlencoded({extended:false}));
app.use('/admin',adminData.routes);//all routes will go through /admin/ 
app.use(shopRoutes);


//registers middleware that parsers bodies through a form

//catch all error message
app.use((req,res,next)=>{
    res.status(404).render('404',{pageTitle:'Page Not Found'});
});

//req are like funnles we go through them from one to another running through middleware
//until you run into a response
//const server=http.createServer(app);

app.listen(3000);

//middle