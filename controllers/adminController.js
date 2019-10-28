const Product = require('../models/product');
const mongodb=require('mongodb');

//const ObjectId=mongodb.ObjectID;

exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {
      pageTitle: 'Add Product',
      path: '/admin/add-product',
      editing:false
    });
  };
  
  exports.postAddProduct = (req, res, next) => {
    const title=req.body.title;
    const imageUrl=req.body.imageUrl;
    const price=req.body.price;
    const description=req.body.description;
    const product=new Product(title,imageUrl,description,price,null,req.user._id);
    product.save()
    .then(result=>{
      res.redirect('/admin/products');
    })
    .catch(err=>{
      console.log(err);
    })
  };

  exports.getEditProduct = (req, res, next) => {
    const editMode=req.query.edit; //for query selectory
    if(!editMode)
    {
       return res.redirect('/')
    }
    const prodId=req.params.productId  //prod ID sent in from dynamic routing editprod/:prodId
    Product.findById(prodId)
    .then(product=> { 
      if(!product){
        return res.redirect('/')
      }
      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',//paths passed for active parts of nav bar
        editing: editMode,
        product: product
      });
    })
   
  };

  exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedImageUrl = req.body.imageUrl;
    const updatedDesc = req.body.description;
  
    const product = new Product(
      updatedTitle,
      updatedPrice,
      updatedDesc,
      updatedImageUrl,
      prodId
    );
    product
      .save()
      .then(result => {
        res.redirect('/admin/products');
      })
      .catch(err => console.log(err));
  };

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
  .then(products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
    
  });
};

exports.postDeleteProduct=(req,res,next)=>{
  const prodId=req.body.productId;
  Product.deleteById(prodId)
  .then(result=>{
    res.redirect('/admin/products');
  })
  .catch(err=>console.log(err));

}
