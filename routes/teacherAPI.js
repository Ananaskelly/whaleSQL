module.exports = function(app, db, parser) {
    app.get('/teacher/api/courses/:id', function (req, res) {
        var id = req.params.id;
        db.query('SELECT title FROM professors_subjects JOIN subjects ON professors_subjects.subject_id = subjects.subject_id           WHERE `professor_id` = ' + parseInt(id) + ';',
            function (err, results, fields) {
                if (err) {
                    return res.sendStatus(500);
                }
                if (results && results.length > 0) {
                    return res.send(JSON.stringify(results));
                }
            })
    });
    app.get('/teacher/api/journal/:id', function(req, res){
        var id = req.params.id;
        db.query('SELECT * FROM marks JOIN subjects ON marks.subject_id = subjects.subject_id JOIN students ON marks.student_id = students.student_id JOIN classrooms ON marks.room_number = classrooms.classroom_id WHERE `professor_id` = ' + parseInt(id) + ';',
            function (err, results, fields) {
                if (err) {
                    return res.sendStatus(500);
                }
                if (results && results.length > 0) {
                    return res.send(JSON.stringify(results));
                }
            })
    });
    app.delete('/teacher/api/delete/mark/:id', function(req, res){
        var id = req.params.id;
        db.query('DELETE FROM marks WHERE mark_id =' + parseInt(id) + ';',
            function (err, results, fields) {
                if (err) {
                    console.log(err);
                    return res.sendStatus(500);
                }
                res.sendStatus(200);
            })
    });
    app.post('/teacher/api/send/mark', parser, function(req, res){
        var mark = req.body;
        db.query('INSERT INTO marks (date,room_number,mark_value,subject_id,student_id,professor_id) VALUES('+mark.date+',(SELECT classroom_id FROM classrooms WHERE number = '+mark.room+'),'+parseInt(mark.mark_value)+',(SELECT subject_id FROM subjects WHERE title = \''+mark.subject+'\'),(SELECT student_id FROM students WHERE name =\''+mark.student+'\'),'+parseInt(mark.professor_id)+');',
            function (err, results, fields) {
                if (err) {
                    console.log(err);
                    return res.sendStatus(500);
                }
                res.sendStatus(200);
            })
    });
    app.put('/teacher/api/update/mark', parser, function(req, res){
        var mark = req.body;
        console.log(req.body);
        db.query('UPDATE marks SET date = '+mark.date+', room_number = (SELECT classroom_id FROM classrooms WHERE number = '+mark.room+'), mark_value = '+parseInt(mark.mark_value)+',subject_id = (SELECT subject_id FROM subjects WHERE title = \''+mark.subject+'\'), student_id = (SELECT student_id FROM students WHERE name =\''+mark.student+'\')' + 'WHERE mark_id = '+parseInt(mark.id)+';',
            function (err, results, fields) {
                if (err) {
                    console.log(err);
                    return res.sendStatus(500);
                }
                res.sendStatus(200);
            })
    })
};