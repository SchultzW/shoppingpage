const path=require('path');
//creates and exports a variable with the directory path in it

module.exports=path.dirname(process.mainModule.filename);