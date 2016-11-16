module.exports = function(db){
    db.query('CREATE TABLE subjects (' +
        'subject_id INT NOT NULL AUTO_INCREMENT,' +
        'title VARCHAR(255) NOT NULL,' +
        'PRIMARY KEY (subject_id) ' +
        ');', function (error, results, fields) {
        console.log(error)
    });
};