const path=require('path');
//creates and exports a variable with the directory path in it

//gives us path to file that is responsible that app is running
module.exports=path.dirname(process.mainModule.filename);