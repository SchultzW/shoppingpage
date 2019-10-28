const db=require('../util/database').getDb;
const mongodb=require('mongodb');

const ObjectId=mongodb.ObjectID;

class User{
    constructor(username,email){
        this.name=username;
        this.email=email;
    }

    save(){
        const db=getDb;
        return db.collection('users').insertOne(this)
        
    }

    static findById(userId){
        const db=getDb();
        return db.collection('users').findOne({_id:new ObjectId(userId)})
        .then()
        .catch((err)=>{
            console.log(err);
        });
    }

}
module.exports=User;