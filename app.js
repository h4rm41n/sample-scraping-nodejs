
var request = require('request'),
    cheerio = require('cheerio'),
    fs      = require('fs'),
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
            request(dataResult[i]).pipe(fs.createWriteStream('img/'+i+'.png'))
        }
        
    }
})