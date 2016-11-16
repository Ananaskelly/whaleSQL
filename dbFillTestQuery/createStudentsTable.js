module.exports = function(db){
    db.query('CREATE TABLE students (' +
        'student_id INT NOT NULL AUTO_INCREMENT,' +
        'grade TINYINT NOT NULL,' +
        'student_group TINYINT NOT NULL, ' +
        'PRIMARY KEY (student_id) ' +
        ');', function (error, results, fields) {
        console.log(error)
    });
};