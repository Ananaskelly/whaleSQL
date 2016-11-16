function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
module.exports = function(db){
    var stData, sbData;
    var dbStQuery = new Promise(function(resolve, reject) {
        db.query('SELECT * FROM students', function (error, results, fields) {
            if (error) {
                reject(error)
            }
            if (results) {
                resolve(results);
            }
        });
    });
    var dbSbQuery = new Promise(function(resolve, reject){
        db.query('SELECT * FROM subjects;', function(error, results){
            if (error) {
                reject(error)
            }
            if (results) {
                resolve(results);
            }
        })
    });
    Promise.all([dbStQuery, dbSbQuery]).then(function(values){
        stData = values[0];
        sbData = values[1];
        var sbAmount = sbData.length;
        for (var i=0; i<stData.length; i++){
            var bound = getRandomInt(4,7);
            for (var j=0; j<bound; j++){
                var index = getRandomInt(0,sbAmount);
                db.query('INSERT IGNORE INTO students_subjects ' +
                    '(student_id,subject_id) VALUES('+ (i+1) + ',' + index + ')', function (error,results,fields) {
                    if (error){
                        console.log(error)
                    }
                })
            }
        }
    })
};
