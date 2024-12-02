const mongoose = require('mongoose');
mongoose.set('strictQuery',true);
const local = "mongodb+srv://dathtph53550:LI7x0JUHKRbxVarK@hoangdat.hwvdf.mongodb.net/thithu3";

const connect = async () => {
    try{
        await mongoose.connect(local);
        console.log("Connnect thanhf cong !!!");
    }catch(error){
        console.log(error);
        console.log("Connect Fail !!");
    }
};

module.exports = {connect};