const mongoose = require("mongoose");


function connectToDb() {

    mongoose.connect(process.env.DB_CONNECT)
    .then(() => console.log("DB connected successfully"))
    .catch ((error) => {
        console.log("DB Connection Failed");
        console.error(error);
        process.exit(1);
    })

}


module.exports = connectToDb;