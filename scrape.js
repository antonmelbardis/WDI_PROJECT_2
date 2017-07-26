const express        = require('express');
const cheerio        = require('cheerio');
const request        = require('request');


// var url = 'http://www.football-italia.net/106259/report-nainggolan-renews-roma';
// request(url, function (error, response, body) {
//
//   var $ = cheerio.load(body);
//   var content = $('.content');
//   var contentText = content.text();
//   console.log(contentText);
//
// });


exports.contentScrape = (url, cb) => {
  request(url, (error, responce, body) => {
    if (error){
      cb({
        error: error
      });
    }
    let $ = cheerio.load(body);
    let $url = url;
    let $content = $('.content').text();

    let contentText = $content

    //respond with content value
    // console.log('scraped from scraper.js', contentText);
    cb(contentText);
  });
};
