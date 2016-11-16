module.exports = function(db){
    db.query('CREATE TABLE classrooms (' +
        'classroom_id INT NOT NULL AUTO_INCREMENT,' +
        'capacity TINYINT UNSIGNED NOT NULL,' +
        'number INT UNSIGNED NOT NULL, ' +
        'PRIMARY KEY (classroom_id) ' +
        ');', function (error, results, fields) {
        if (error){
            console.log(error);
        }
    });
};
