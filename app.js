
var request = require('request'),//package untuk request ke target untuk mengambil konten webpage
    cheerio = require('cheerio'),//package untuk menelusuri semua elemen html
    fs      = require('fs'),//package bawaan nodejs untuk proses manipulasi file
    dataResult = [],
    target  = 'http://mataramkota.go.id/';

request(target, function(err, res, body){
    if(!err && res.statusCode == 200){
        var $ = cheerio.load(body);
        $('img').each(function(){
            var result = target+$(this).attr('src');
            dataResult.push(result);
        });
        console.log(dataResult.length);
        for(var i=0;i<dataResult.length;i++){
            request(dataResult[i]).pipe(fs.createWriteStream('img/'+i+'.jpg'))
        }
    }
})