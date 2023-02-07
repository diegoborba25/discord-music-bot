const mongoose = require('mongoose')    
const  { mongoPath } = require('./config.json')

module.exports = async () => {
    mongoose.set("strictQuery", true);
    mongoose.connect(mongoPath, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    return mongoose
}
