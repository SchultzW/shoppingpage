const Product = require('../models/product');

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
    const product=new Product(title,imageUrl,description,price);
    product.save();
    res.redirect('/');
  };

  exports.getEditProduct = (req, res, next) => {
    const editMode=req.query.edit; //for query selectory
    if(!editMode)
    {
       return res.redirect('/')
    }
    const prodId=req.params.productId  //prod ID sent in from dynamic routing editprod/:prodId
    Product.findById(prodId,product=>{ //get prod and then render the page and pass a product
      if(!product){
        alert("No Product found");
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

exports.postEditProduct=(res,req,next)=>{

  
}

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  });
};