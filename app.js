const path=require('path');
const express=require('express');
const bodyParser=require('body-parser');

const db=require('./util/database');
const errorController=require('./controllers/error');

const mongoConnect=require('./util/database').mongoConnect;
//creates an express appliaction
//this app will store logic and other stuff behind the scences
const app=express();

app.set('view engine','ejs');
//explicitly tells app where to look for views. 
//Default is views so dont actually need to do this just fyi
app.set('views','views')

//imports router object from the routes folder.
const adminRoutes=require('./routes/admin')
const shopRoutes=require('./routes/shop');

const  User=require('./models/user');
//staticialy served means not handled by express or middleware
//directly fowarded to file system.
//we need this to access css files
app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.urlencoded({extended:false}));



app.use((req,res,next)=>{
    User.findById('5db639dcd6142c41e88cb954')
    .then(user=>{
        req.user=user;
        next();
    })
})


//automattically consider routes in admin folder
//still works like a folder.

app.use('/admin',adminRoutes);//all routes will go through /admin/ 
app.use(shopRoutes);


//registers middleware that parsers bodies through a form

//catch all error message
app.use(errorController.get404);

//req are like funles we go through them from one to another running through middleware
//until you run into a response
//const server=http.createServer(app);

mongoConnect(()=>{
    
    app.listen(3000);
});


//middle