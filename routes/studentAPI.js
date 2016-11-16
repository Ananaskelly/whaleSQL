module.exports = function(app, db){
    app.get('/student/api/courses/:id', function(req,res){
        var id = req.params.id;
        db.query('SELECT title FROM students_subjects JOIN subjects ON students_subjects.subject_id = subjects.subject_id           WHERE `student_id` = '+parseInt(id)+';',
            function(err,results,fields){
                if (err){
                    res.send(500);
                }
                if (results.length > 0) {
                    return res.send(JSON.stringify(results));
                }
            })
    });
    app.get('/student/api/group/:id', function(req,res){
        var id = req.params.id;
        db.query('SELECT * FROM students WHERE student_group = (SELECT student_group FROM students WHERE student_id = '+parseInt(id)+')' + ' AND grade = (SELECT grade FROM students WHERE student_id = '+parseInt(id)+')',
            function(err,results,fields){
                if (err){
                    console.log(err);
                    return res.sendStatus(500);
                }
                if (results.length > 0) {
                    return res.send(JSON.stringify(results));
                }
            })
    })
};
