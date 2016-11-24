module.exports = function(app, db) {
    app.get('/subject/api/:subject', function (req, res) {
        var subj = req.params.subject;
        db.query('SELECT name FROM students_subjects JOIN students ON students_subjects.student_id = students.student_id           WHERE `subject_id` = (SELECT subject_id FROM subjects WHERE title ="' + subj + '");',
            function (err, results, fields) {
                if (err) {
                    console.log(err);
                    return res.sendStatus(500);
                }
                if (results && results.length > 0) {
                    return res.send(JSON.stringify(results));
                }
            })
    });
};
