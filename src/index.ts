import cheerio from 'cheerio';
import express from 'express';
import fs from "fs";
import request from 'request';
import moment from 'moment';
import {ParseData} from './parser'

const app = express();
const port = 8000;

// comment for now
// const url = "https://www.forexfactory.com/calendar.php";
// const destination = fs.createWriteStream('./src/downloads/ff.html');
// request(url)
// .pipe(destination)
// .on("finish", function() {
//     console.log("done");
// })
// .on("error", function(err) {
//     console.log(err);
// })

const pd = new ParseData();
const file = './src/downloads/ff.html';
let html = fs.readFileSync(file, 'utf8');
const data = pd.parseHtml(html);
console.log(data);

app.listen(port);
console.log("listening on port 8000");
