import cheerio from 'cheerio';
import express from 'express';
import fs from "fs";
import request from 'request';
import moment from 'moment';

export class ParseData {
    public test() {
        console.log("parsing!!!");
    }

    public parseHtml(html: string): any[] {
        const $: any = cheerio.load(html);
        let h = $.html();
        let calData: any = [];
        let weekOf=$('.highlight').filter('.light').text();
        console.log(weekOf);
        
        let prevDate="", prevTime="", title='', impact='', yyyy = '';
        let children = $('.calendar__row');
        $('.calendar__row').each(function(i: any,element: any) {
            var data = $(element);
            if (data.children().length > 2) {
                let c = data.children();
                let d = '';
                for( let i=0;i<data.children().length; i++){
                    // console.log($(c[0]).text())
                    d = d + $(c[i]).text().trim() + ',';
                }
                //console.log(d)
                calData.push(d);
            }
        })  
        return calData;    
    }
    
}