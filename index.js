import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

//create express app 
const port = 3000;
const app = express();

//set the public folder to static 
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

//direct user to main page 
app.get("/", (req, res) => {
    res.render("index.ejs");
})

//api call for when the user types in a manga title to search up 
const baseURL = 'https://api.mangadex.org';

app.post('/search-result', async (req, res) => {
    const searchTitle = req.body.search;
})


//listen on port 3000
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});