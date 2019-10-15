//routes for what the user sees

//for sending paths
const path=require('path');
const rootDir=require('../util/path');
const express=require('express');
const router=express.Router();
const adminData=require('./admin');

//the / folling app use is the route any time we go to our website  / the following middleware runs
router.get('/',(req,res,next)=>{
        //old stuff being replaced by new way
        //console.log(adminData.products);
        //res.send();//allows us to send a response. can attach a body something like html

        //path.join creates the path to the view folder and the shop.html ../ means go back
        //res.sendFile(path.join(rootDir,'views','shop.html'));

        const products=adminData.products;
        //use default templating engine to render the view
        res.render('shop',{prods:products,docTitle:'shop'});//pass JS object mapped to products
});

module.exports=router;