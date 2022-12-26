require('dotenv').config();
const express = require("express");
const app = express();
const ShortUrl = require("./models/shortUrl");
const connectDB = require("./db/connect");
const port = process.env.PORT || 4000;




// mongoose.connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// });

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));

// render index file on root route
app.get("/", async (req, res) => {
    const shortUrls = await ShortUrl.find();
    res.render("index", { shortUrls: shortUrls });
});

app.post("/shortUrls", async (req, res) => {
    var dataCheck = await ShortUrl.findOne({ full: req.body.fullUrl });
    if(!dataCheck){
        await ShortUrl.create({ full: req.body.fullUrl });
    }
    res.redirect("/");
});

app.post("/api/shortUrls", async (req, res) => {
    var dataCheck = await ShortUrl.findOne({ full: req.body.fullUrl });
    if(!dataCheck){
        await ShortUrl.create({ full: req.body.fullUrl });
    }
    res.send({'success' : true});
});


app.get("/:shortUrl", async (req, res) => {
    const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl });
    if (shortUrl == null) return res.sendStatus(404);

    shortUrl.clicks++;
    shortUrl.save();

    res.redirect(shortUrl.full);
});

// app.listen(process.env.PORT || 5000);



const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () =>
            console.log(
                `API is setup on✅... http://localhost:${port}/`
            )
        );
        console.log("connected to db🔥...");
    } catch (err) {
        console.log("error with db❌ =>", err);
    }
};

start();
