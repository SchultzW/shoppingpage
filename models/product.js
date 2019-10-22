const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);

const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(id,title,imageUrl,description,price) {
    this.title = title;
    this.imageUrl=imageUrl;
    this.description=description;
    this.price=price;
    this.id=id;
  }

  save() {
    
    getProductsFromFile(products => {
      if(this.id){
        const existingProdIndex=products.findById(prod=>prod.id===this.id);
        const updatedProducts=[...products];
        updatedProducts[existingProdIndex]=this;

      }

      this.id=Math.random().toString();
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), err => {
        console.log(err);
      });
    });
  }

  static findById(id,cb){
    getProductsFromFile(products=>{
      const product=products.find(p=>p.id===id);
      cb(product);
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }
};
