const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');
const port = process.env.PORT || 3000;
const connection = process.env.DB_CONNECTION||'mongodb+srv://nshnt1999:nshnt1999@cluster0.l0mnj.mongodb.net/codeSplashDB?retryWrites=true&w=majority'


//models
//Courses
//Playlist
//Bookmarks

//USER


//middlewares
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/',(req,res)=>{
    res.send("Welcome")
})

//import routes
const coursesRoute = require('./routes/courses');
const playListRoute = require('./routes/playListRoute');
const authRoute = require('./routes/auth');
const bookmarkRoute = require('./routes/bookmark');
const notesRoute = require('./routes/notes');
const historyRoute = require('./routes/history');

app.use('/courses', coursesRoute);
app.use('/playlist', playListRoute);
app.use('/bookmark', bookmarkRoute);
app.use('/auth', authRoute);
app.use('/notes', notesRoute);
app.use('/history', historyRoute);




//Routes
app.get('/', (req, res) => {
    res.send("We are on home")
})


//connect to DB
mongoose.connect(connection, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, ()=>console.log("Connected to DB"))

//Listening to the server
app.listen(port, ()=>console.log(`Server started at http://localhost:${port}/`));

