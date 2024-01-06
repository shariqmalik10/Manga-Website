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

//result object being created to ease the complexity of the data being pushed when the updated index.ejs is rendered
function resultObj(title, imgURL, desc) {
    this.title = title;
    this.imgURL = imgURL;
    this.desc = desc; 
}

//api call for when the user types in a manga title to search up 
const baseURL = 'https://api.jikan.moe/v4/manga';
app.post('/search-result', async (req, res) => {
    const searchTitle = req.body.search;
    const apiURL = `${baseURL}?sfw&q=${searchTitle}`;
    try {
        const response = await axios.get(apiURL);

        //testing to see different types of output. Some results will have only japanese titles so deal with em accordingly
        var results = [];
        for (let i=0; i<response.data.data.length; i++) {
            //atm only displaying manga titles that are in english as the majority japanese titles do not have any info available 
            if (response.data.data[i].title_english && response.data.data[i].background != null && results.length < 4){
                //create a new object for the result and then push that to the array
                var result = new resultObj(
                    JSON.stringify(response.data.data[i].title_english),
                    response.data.data[i].images.jpg.image_url,
                    JSON.stringify(response.data.data[i].background)
                );
                results.push(result);
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