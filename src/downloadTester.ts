var fs = require('fs');
var request = require('request');
var http = require('http');
var net = require('net');
var json = JSON.parse(fs.readFileSync('../jsondata/scrapeUrls.json', 'utf8'));
json.forEach(function (item) {
    request(item.url, function (error, response, html) {
        fs.writeFile('../jsondata/ffhtml/' + item.fname, html, function (err) {
            if (err)
                console.log(err);
            else {
                console.log(item.fname + ' has been saved!');
            }
        });
    });
});
//# sourceMappingURL=testreadscrapefile.js.map