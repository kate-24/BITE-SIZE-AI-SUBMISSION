require('dotenv').config();
const express = require("express"); // Get the library
const app = express(); // make the app run express
const cors = require("cors"); // lets front end make requests to back end
const pool = require("./db"); // require the db.js file from parent folder

// middleware
app.use(cors());
app.use(express.json());

//ROUTES//

// send in an address

app.post("/bites", async(req, res) => {
    try {
        
        //console.log(req.body);

        const { address } = req.body; // equivalent to const address = req.body.address;
        const newAddress = await pool.query(
            "INSERT INTO bite (address) VALUES($1) RETURNING * ", // Returning returns back the data
            [address] // this argument replaces the $1 part kinda like f-string
        ); 

        res.json(newAddress.rows[0]); // Access the rows column that is returned after POST (in postman)
    } catch (err) {
        console.error(err.message);
        
    }
})

// get a bite (specific bite)
/*
app.get("/bites/:id", async(req,res) => { 
    // the :id slot if replaced in url by something else, gets returned
    // This can be used to access specific elements. Ex. :subject returns { subject: '2'} for
    // url /bites/2
    try {
        const { id } = req.params; // const id = req.params.id;
        const bite = await pool.query("SELECT * FROM bite WHERE bite_id = $1", 
            [id]);
        // WHERE makes it access only the specified row, NOT all rows by default,
        
        //console.log(req.params);

        res.json(bite.rows[0]);
    } catch (err) {
        console.error(err.message);
        
    }
*/
    // Assuming you have already set up your pool and required dependencies

    // Get the latest bite entry
    app.get("/bites/latest", async (req, res) => {
        try {
        const latestBite = await pool.query(
            "SELECT * FROM bite ORDER BY bite_id DESC LIMIT 1"
        );
        res.json(latestBite.rows[0]);
        } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "Server Error" });
        }
    });
  

// set the port from environment variable or default to 5000
const port = process.env.SV_port || 5000;

app.listen(port, () => {
    console.log("server has started on port "+ port.toString());
});
