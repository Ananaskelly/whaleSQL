var fs = require('fs');
module.exports = function(db){
    var professors = JSON.parse(fs.readFileSync('./data/professorsEdited.json'));
    for (var key in professors) {
        db.query('INSERT INTO professors ' +
            'SET ?', professors[key],
            function (error, results, fields) {
                if (error) {
                    console.log(error);
                }
            });
    }
};

