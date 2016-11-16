module.exports = function(db){
    db.query('CREATE TABLE professors (' +
        'professor_id INT NOT NULL AUTO_INCREMENT,' +
        'name VARCHAR(255) NOT NULL,' +
        'unikey INT NOT NULL, ' +
        'password VARCHAR(255) NOT NULL,' +
        'PRIMARY KEY (professor_id) ' +
        ');', function (error, results, fields) {
        if (error){
            console.log(error);
        }
    });
};
