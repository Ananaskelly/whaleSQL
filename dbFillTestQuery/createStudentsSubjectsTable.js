module.exports = function(db){
    db.query('CREATE TABLE students_subjects (' +
        'id INT NOT NULL AUTO_INCREMENT,' +
        'subject_id INT NOT NULL, ' +
        'student_id INT NOT NULL, ' +
        'PRIMARY KEY (id),' +
        'UNIQUE KEY(subject_id, student_id),' +
        'FOREIGN KEY (subject_id) REFERENCES subjects(subject_id) ' +
        'ON UPDATE CASCADE ON DELETE CASCADE,' +
        'FOREIGN KEY (student_id) REFERENCES students(student_id)' +
        'ON UPDATE CASCADE ON DELETE CASCADE' +
    ')', function(error, results, fields){
        console.log(error);
    })
};