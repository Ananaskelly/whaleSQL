var fs = require('fs');
module.exports = function(db){
    var students = JSON.parse(fs.readFileSync('./data/students.json'));
    for (var key in students) {
        db.query('INSERT INTO students ' +
            'SET ?', students[key],
            function (error, results, fields) {
                if (error) {
                    console.log(error);
                }
        });
    }
};
