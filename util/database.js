const mongodb=require('mongodb');
const MongoClient=mongodb.MongoClient;

let db;

const mongoConnect=(cb)=>{
    MongoClient.connect('mongodb+srv://admin:notapassword@cluster0-ghhtq.mongodb.net/test?retryWrites=true&w=majority')
    .then(client=>{
        console.log('Connected!');
        db=client.db('shop');
        cb();
    })
    .catch((err=>{
        console.log(err);
        throw err;
    }));

};

const getDb=()=>{
    if(db){
        return db;
    }
    throw 'no database found';
}

exports.mongoConnect=mongoConnect;
exports.getDb=getDb;