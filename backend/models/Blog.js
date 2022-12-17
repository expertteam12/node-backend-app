const mongoose = require('mongoose');
const {Schema} = mongoose;
const BlogsSchema = new Schema({
    user:{
       type: mongoose.Schema.Types.ObjectId,
       ref: 'user'
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    image:{
        type:String,
        default:""
    },
    category:{
        type:String,
        default:"general"
    },
    date:{
        type:Date,
        default:Date.now
    }
  });

  module.exports = mongoose.model('blogs',BlogsSchema);