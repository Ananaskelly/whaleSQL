var fs = require('fs');
module.exports = function(db){
    var rooms = JSON.parse(fs.readFileSync('./data/rooms.json'));
    for (var key in rooms) {
        db.query('INSERT INTO classrooms ' +
            'SET ?', rooms[key],
            function (error, results, fields) {
                console.log(error);
            });
    }
};
