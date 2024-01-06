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
const baseURL = 'https://api.jikan.moe/v4/manga';
app.post('/search-result', async (req, res) => {
    const searchTitle = req.body.search;
    const apiURL = `${baseURL}?q=${searchTitle}&limit=3`;
    try {
        const result = await axios.get(apiURL);

        //testing to see different types of output. Some results will have only japanese titles so deal with em accordingly
        var title = "";
        var results = [];
        for (let i=0; i<result.data.data.length; i++) {
            if (result.data.data[i].title_english){
                console.log(JSON.stringify(result.data.data[i].title_english));
                results.push(JSON.stringify(result.data.data[i].title_english));
                
            }
            else {
                console.log(JSON.stringify(result.data.data[i].title_japanese));
                results.push(JSON.stringify(result.data.data[i].title_japanese))
            }
        }
        res.render("index.ejs", {content: results})
    } catch (error) {
        console.log(error);
    }

})


//listen on port 3000
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});