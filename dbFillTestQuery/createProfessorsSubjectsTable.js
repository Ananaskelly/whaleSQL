module.exports = function(db){
    db.query('CREATE TABLE professors_subjects (' +
        'id INT NOT NULL AUTO_INCREMENT,' +
        'subject_id INT NOT NULL, ' +
        'professor_id INT NOT NULL, ' +
        'PRIMARY KEY (id),' +
        'FOREIGN KEY (subject_id) REFERENCES subjects(subject_id) ' +
        'ON UPDATE CASCADE ON DELETE RESTRICT,' +
        'FOREIGN KEY (professor_id) REFERENCES professors(professor_id)' +
        'ON UPDATE CASCADE ON DELETE RESTRICT' +
        ')', function(error, results, fields){
            if (error) {
                console.log(error);
            }
    })
};
