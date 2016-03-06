var mongoose = require("mongoose");
var roomSchema = new mongoose.Schema({
    room:String,
    content:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"chat"
    }
})

roomSchema.statics = {
    fetch: function(cb){//去出数据库里的所有数据
        // console.log('web is open in:');
        return this
            .find({})
            .sort('meta.updateAt')//按更新时间排序
            .exec(cb)
    },
    findById: function(id,cb){//查询单条的数据
        return this.findOne({_id:id}).exec(cb);
    }
}

var roomModel = mongoose.model("room",roomSchema);

module.exports = roomModel;
