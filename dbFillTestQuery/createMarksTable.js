module.exports = function(db){
    db.query('CREATE TABLE marks (' +
        'mark_id INT NOT NULL AUTO_INCREMENT,' +
        'date DATETIME NOT NULL,' +
        'room_number INT NOT NULL,' +
        'mark_value TINYINT NOT NULL,' +
        'subject_id INT NOT NULL,' +
        'student_id INT NOT NULL,' +
        'professor_id INT NOT NULL,' +
        'FOREIGN KEY (student_id) REFERENCES students(student_id) ' +
        'ON UPDATE CASCADE ON DELETE RESTRICT,' +
        'FOREIGN KEY (subject_id) REFERENCES subjects(subject_id) ' +
        'ON UPDATE CASCADE ON DELETE RESTRICT,' +
        'FOREIGN KEY (professor_id) REFERENCES professors(professor_id)' +
        'ON UPDATE CASCADE ON DELETE RESTRICT,' +
        'FOREIGN KEY (room_number) REFERENCES classrooms(classroom_id) ' +
        'ON UPDATE CASCADE ON DELETE RESTRICT,' +
        'PRIMARY KEY (mark_id) ' +
        ');', function (error, results, fields) {
        if (error){
            console.log(error);
        }
    });
};

