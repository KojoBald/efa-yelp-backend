if(process.env.dev) require('dotenv').config();

const axios = require('axios');
const app = require('express')();

const port = process.env.PORT || 8080;
const url = 'https://api.yelp.com/v3/businesses/search'

app.get('/', (req, res) => {
    req.query.open_now = true;
    axios.get(url, { 
        headers: { 'Authorization': `Bearer ${process.env.API_KEY}` },
        params: req.query 
    }).then(response => {
        console.log(response);
        res.send(response);
    }).catch(error => {
        console.error(error);   
        res.send(error.message)
    })
})

app.listen(port, () => console.log(`app is listening on port ${port}`));