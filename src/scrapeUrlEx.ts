import { ScrapeUrl } from './models/scrapeUrl';
import * as Enumerable from 'node-enumerable';
 
var fs = require('fs');
var moment = require('moment');

export class ScrapeUrlEx {
    public static GetScrapeUrls(): Array<ScrapeUrl> {
        let htmlFile:string = '../data/scrapeUrls.json';
        let arr = Array<ScrapeUrl>();
        
        let z = fs.readFileSync(htmlFile);
        arr = JSON.parse(z);
        return arr;    
    }    

    public static GenerateScrapeUrls(): Array<ScrapeUrl> {
        var start = new Date('jan 2007');
        let urls = Array<ScrapeUrl>();
        const dtNow = new Date();
        var dtBegin = moment(start);
        var dtEnd = moment(new Date());

        var fname = 'ff.'; 
        for (var x = 1; x < 200; x++) {
            var url = 'https://www.forexfactory.com/calendar.php?month=' + dtBegin.format('MMM.YYYY');
            fname = 'ff-' + dtBegin.format('YYYY.MM') + '.html';
            if (dtBegin.get('year') == dtEnd.get('year')) {
                if (dtBegin.get('month') > dtEnd.get('month')) {
                    break;
                }
            }
            urls.push({
                url: url.toLowerCase(),
                fname: fname
            });
            dtBegin.add({ months: 1 }).format('MMM.YYYY');
        }
        console.log('done!!'); 
        // var data = JSON.stringify(urls, null, 4);
        // console.log(data);
        return urls;
    }

    public static SaveScrapeUrls(urls) {
        let htmlFile:string = '../data/scrapeUrls.json';
        console.log(urls);
        fs.writeFile(htmlFile, urls, function (err) {
            if (err)
                return err; 
            else
                return urls;
        });
    }
}