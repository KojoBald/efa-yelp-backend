if(process.env.dev) require('dotenv').config();

const axios = require('axios');
const cors = require('cors');
const app = require('express')();

const port = process.env.PORT || 8080;
const url = 'https://api.yelp.com/v3/businesses/search'

app.use(cors());

app.get('/', (req, res) => {
    req.query.open_now = true;
    axios.get(url, { 
        headers: { 'Authorization': `Bearer ${process.env.API_KEY}` },
        params: req.query 
    }).then(({ data: { businesses } }) => {
        let random = businesses[Math.floor(Math.random() * businesses.length)]
        res.status(200).send(random);
    }).catch(error => {
        console.error(error);   
        res.send(error.message)
    })
})

app.listen(port, () => console.log(`app is listening on port ${port}`));