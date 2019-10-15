
//routes that handle admin paths
const express=require('express');
const path=require('path');

//rootdir is a var with the path to the root
const rootDir=require('../util/path');
//router is like mini expressout that is tied to main app
//we can export the router for use elsewhere
const Router=express.Router();

//temp variable to hold info for the tut will be replaced later
const products=[]

//use adds us to add new middleware
//next is a function. must call next() to allow program to progre
//to next piece of middleware

// /admin/add-product =>GET
Router.get('/add-product',(req,res,next)=>{    
    res.sendFile(path.join(rootDir,'views','add-product.html'))
});

//app.get is similiar as app use but only works for get requests
//can use same name because one is get and other is post

// /admin/add-product =>POST
Router.post('/add-product',(req,res,next)=>{
    products.push({title: req.body.title});

    res.redirect('/');//used to rederict to another page
})


//the get routes are registered to this router
exports.routes=Router;
exports.products=products;