const fs =  require('fs');
const path = require('path');
const cheerio =  require('cheerio');
const moment = require('moment');

function parseYearFromFilename(filename: string){
    let ff = path.parse(filename).base
    let dd=ff.replace('ff-', '').replace('.html','');
    let yyyy=new Date(dd).getFullYear();
    console.log(yyyy);
    return yyyy;
}

function parseFile(file: string){
    // ff-2007.03
    console.log('!! PATH IS: ' +path.parse(file));
    let yyyy=this.parseYearFromFilename(file);

    let html = fs.readFileSync(file, 'utf8'); 
    let scrapeData=this.parseHtml(html, yyyy);
    return scrapeData;
}

function parseHtml(html: string, yyyy: any){
    let $ = cheerio.load(html);
    let h = $.html();

    let weekOf=$('.highlight').filter('.light').text();
    weekOf = weekOf.replace('This Week: ', '');
    let scrapeData = {
        weekOf: weekOf,
        calendarData: []
    };
    
    let prevDate="", prevTime="", title='', impact='';

    $('.calendar__row').filter(function() {
        let children=$(this).children();

        if($(children).length>2){
            if($(children[0]).text()!==""){
                prevDate=$(children[0]).text();
            } else {
                $(children[0]).text(prevDate);
            }

            if($(children[1]).text()!==""){
                prevTime=$(children[1]).text();
            } else {
                $(children[1]).text(prevTime);
            }
            
            $('.calendar__impact-icon--screen').filter(function(){
                impact = $(this).find("span").first().attr("title");
            });
            
            $('.calendar__event-title').filter(function(){
                title = $(this).find("span").first().attr("title");
            });
            let eventId = $(this).data('eventid');

            let origDate = $(children[0]).text().substring(3);
            let origTime = $(children[1]).text().replace('am',' AM').replace('pm',' PM');
            
            let dt = moment(new Date(yyyy +origDate+ ' '+ origTime)); 
            if (!dt.isValid())
                dt = moment(new Date(yyyy + origDate)); 

            if (dt.isDST())
                dt.subtract(1, 'hour');

            scrapeData.calendarData.push({
                eventid: eventId,
                releaseDateTime: dt.format(),
                releaseDate: $(children[0]).text(),
                releaseTime: $(children[1]).text(),
                currency: $(children[2]).text(),
                impact: impact,
                indicator:$(children[4]).text().trim(),// title,
                actual: $(children[6]).text(),
                forecast: $(children[7]).text(),
                previous: $(children[8]).text()
            });
        }
    });
    return scrapeData;
}

module.exports = { parseYearFromFilename, parseFile, parseHtml };
