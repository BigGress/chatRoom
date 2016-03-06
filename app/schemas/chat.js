var mongoose = require("mongoose");
var chatSchema = new mongoose.Schema({
    user:String,
    message:String,
    updateAt:{
        type:Date,
        default:Date.now()
    }
})

chatSchema.pre("save",function(next){
    this.updateAt = Date.now()

    next()
})

chatSchema.statics = {
    fetch: function(cb){//去出数据库里的所有数据
        // console.log('web is open in:');
        return this
            .find({})
            .sort({
                updateAt:-1
            })//按更新时间排序
            .exec(cb)
    },
    findById: function(id,cb){//查询单条的数据
        return this.findOne({_id:id}).exec(cb);
    }
}

var chatModel = mongoose.model("chat",chatSchema);

module.exports = chatModel;
