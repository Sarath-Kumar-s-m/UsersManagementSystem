const mongoose = require('mongoose');


const dataBaseConnection = async (req, res) => {
    let connectionState = await mongoose.connect('mongodb://localhost:27017/UMS');
    if(!connectionState){
        console.log('Connection Atempt Failed !')
    }else {
        console.log('Connected Successfully !');
    }
}


module.exports = dataBaseConnection;