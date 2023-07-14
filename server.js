const express = require('express');
const app = express();

const path = require('path');
const fs = require('fs');

const scrapedData = require('./scraped_data.json');

app.use(express.static('public'));

app.get('/scraped-data', (req, res, next) => {
    // Get 500 listings and delete duplicates
    const slicedData = scrapedData.slice(0, 500);
    const seen = new Set();
    const uniqueListings = slicedData.filter(item => {
      const duplicate = seen.has(item.image);
      seen.add(item.image);
      return !duplicate;
    });
    console.log("the response is in progress")
    res.json(uniqueListings);
  });

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});