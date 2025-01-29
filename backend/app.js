const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');
const connectToDb = require('./db/db');
const userRoutes = require('./routes/user.routes');
const captainRoutes = require('./routes/captain.routes');
const mapsRoutes = require('./routes/maps.route');
const rideRoutes = require('./routes/ride.route');
const path = require("path")

connectToDb();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());



// app.get('/', (req, res) => {
//     res.send('Hello World');
// });

app.use('/users', userRoutes);
app.use('/captains', captainRoutes);
app.use('/maps', mapsRoutes);
app.use('/rides', rideRoutes);


const NODE_ENV = "production";

// Serve frontend
if (NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "./dist")));
  
    app.get("*", (req, res) =>
        res.sendFile(
            path.resolve(__dirname, "./", "dist/", "index.html")
        )
    );
} else {
    app.get("/", (req, res) => res.send("Please set to production"));
}


module.exports = app;