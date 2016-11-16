var fs = require('fs');
var cryptojs = require('crypto-js');
var fileName = './data/professors.json';
var contents = fs.readFileSync(fileName, 'utf8');
var i = 0;
/*var modifiedData = contents.replace(/{/g,function(){
 i++;
 return '"user'+i+'":{';
 }).replace('[','{').replace(']','}');*/
var modifiedData = contents.replace(/"password":.*"(.*)"/g,function($0,$1){
    return '"password": "'+cryptojs.MD5($1).toString(cryptojs.enc.Base64)+'"';
});
fs.writeFile('./data/professorsEdited.json', modifiedData, function (err) {
    if (err) {
        return console.log(err);
    }
});