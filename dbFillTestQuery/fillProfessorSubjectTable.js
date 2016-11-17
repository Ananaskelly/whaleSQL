module.exports = function(db){
    var pData, sbData;
    var dbSbQuery = new Promise(function(resolve, reject) {
        db.query('SELECT * FROM subjects;', function (error, results, fields) {
            if (error) {
                reject(error)
            }
            if (results) {
                resolve(results);
            }
        });
    });
    var dbPQuery = new Promise(function(resolve, reject){
        db.query('SELECT * FROM professors;', function(error, results){
            if (error) {
                reject(error)
            }
            if (results) {
                resolve(results);
            }
        })
    });
    Promise.all([dbPQuery, dbSbQuery]).then(function(values){
        pData = values[0];
        sbData = values[1];
        var minItem, mxItem;
        var min = Math.min(pData.length, sbData.length);
        var max = Math.max(pData.length, sbData.length);
        if (min === pData.length){
            minItem = 'professor_id';
            maxItem = 'subject_id';
        } else {
            maxItem = 'professor_id';
            minItem = 'subject_id';
        }
        var j = 0;
        for (var i=0; i<max; i++){
            db.query('INSERT IGNORE INTO professors_subjects ' +
                '('+maxItem+','+minItem+') VALUES('+ i + ',' + j + ')', function (error,results,fields) {
                if (error){
                    console.log(error)
                }
            });
            if (j<min){
                j++;
            } else {
                j = 0;
            }
        }

    })
};