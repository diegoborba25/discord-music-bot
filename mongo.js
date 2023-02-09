const mongoose = require('mongoose')
const { mongoPath } = require('./config.json')

module.exports = async () => {
    mongoose.set("strictQuery", true);
    await mongoose.connect(mongoPath, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        ignoreUndefined: true
    }).then(() => console.log('DataBase Connected!')).catch(err => console.log(err))
    return mongoose
}