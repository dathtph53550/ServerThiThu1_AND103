const mongoose = require('mongoose');

const XeMay = new mongoose.Schema({
    ten_xe:{type:String,required:true},
    mau_sac:{type:String,required:true},
    gia_ban:{type:Number,required:true,default:0},
    mo_ta: {type:String},
    hinh_anh:{type:String}
}); 

module.exports = mongoose.model('XeMay',XeMay);