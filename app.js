const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");  

const app = express();

const shortUrl = require("./models/shortUrl");

app.use(bodyparser.json());
app.use(cors());

//Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/shortUrl');


app.use(express.static(__dirname + '/public'));

app.get("/new/:urlToShorten(*)", (req, res, next) => {
    var { urlToShorten } = req.params;
    console.log(urlToShorten);
    
    //url regex
    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = expression;

    if (regex.test(urlToShorten) === true) {
        var short = Math.floor(Math.random()*100000).toString();

        var data = new shortUrl(
            {
                originalUrl: urlToShorten,
                shortUrl: short
            }
        );

        data.save(err => {
            if (err) {
                return res.send("Error saving to DB");
            }
            return res.json(data);
        });


        return res.json({urlToShorten});
    }
    else {
        return res.json({urlToShorten: "Failed"});
    }
    
});





app.listen(process.env.PORT || 3000, () => {
    console.log("server is running...");
});
