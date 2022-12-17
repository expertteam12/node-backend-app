const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://vendorfirst:V3dW23%23%245D54f@cluster0.d69tq.mongodb.net/iNotebook?retryWrites=true&w=majority"
const connectToMongo = ()=>{
    mongoose.connect(mongoURI,()=>{
        console.log("Connect to Mongo Successfully");
    })
}
module.exports = connectToMongo;