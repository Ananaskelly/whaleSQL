module.exports = function(app, db,json){
    app.get('/admin/api/:type', function(req,res){
        var contentT = req.params.type;
        switch (contentT) {

            case 'professors':
            {
                db.query('SELECT professors.*, GROUP_CONCAT(subjects.title) AS titles FROM ' + contentT + ' JOIN subjects ON subjects.subject_id in (SELECT subject_id FROM professors_subjects WHERE professors.professor_id = professors_subjects.professor_id) GROUP BY professor_id', function (error, results, fields) {
                    if (error) {
                        console.log(error);
                        return res.sendStatus(500);
                    }
                    res.send(results);
                });

                break;
            }
            case 'students':
            {
                db.query('SELECT students.*, GROUP_CONCAT(subjects.title) AS titles FROM ' + contentT + ' JOIN subjects ON subjects.subject_id in (SELECT subject_id FROM students_subjects WHERE students.student_id = students_subjects.student_id) GROUP BY student_id', function (error, results, fields) {
                    if (error) {
                        console.log(error);
                        return res.sendStatus(500);
                    }
                    res.send(results);
                });

                break;
            }
            default :
            {
                db.query('SELECT * FROM ' + contentT, function (error, results, fields) {
                    if (error) {
                        return res.sendStatus(500);
                    }
                    res.send(results);
                })
            }
        }
    });
    app.get('/admin/help/subjects', function(req, res){
        db.query('SELECT title FROM subjects', function(err,result){
            if (err){
                return res.sendStatus(500);
            } else {
                res.send(result);
            }
        })
    });
    app.delete('/admin/api', function(req,res) {
        var type = req.query.type;
        var id = req.query.id;
        var id_type = type.substring(0, type.length - 1);
        db.query('DELETE FROM ' + type + ' WHERE ' + id_type +'_id = ' + id, function(error,results){
            if (error) {
                return res.sendStatus(500);
            }
            res.sendStatus(200);
        })
    });
    app.delete('/admin/special/api', function(req,res) {
        var type = req.query.type;
        var id = req.query.id;
        var title = req.query.title;
        var id_type = type.substring(0, type.length - 1);
        console.log('DELETE FROM ' + type  + '_subjects WHERE ' + id_type +'_id = ' + id + ' AND subject_id = (SELECT subject_id FROM subjects WHERE `title` = `' + title + '`)');
        db.query('DELETE FROM ' + type  + '_subjects WHERE ' + id_type +'_id = ' + id + ' AND subject_id = (SELECT subject_id FROM subjects WHERE `title` = \'' + title + '\')', function(error,results){
            if (error) {
                return res.sendStatus(500);
            }
            res.sendStatus(200);
        })
    });
    app.put('/admin/api/:type',json, function(req,res) {
        var type = req.params.type;
        var id_type = type.substring(0, type.length - 1);
        var data = req.body;
        var id = data[id_type+'_id'];
        switch (type) {
            case 'students':
            {
                db.query('UPDATE ' + type + ' SET `grade` = ?, `student_group` = ?, `unikey` = ?, `name` = ? WHERE ' + id_type + '_id = ' + id, [data.grade, data.student_group, data.unikey, data.name], function (error, results) {
                    if (error) {
                        console.log(error);
                        return res.sendStatus(500);
                    }
                    res.sendStatus(200);
                });
                break;
            }
            case 'professors':
            {
                db.query('UPDATE ' + type + ' SET `unikey` = ?, `name` = ? WHERE ' + id_type + '_id = ' + id, [data.unikey, data.name], function (error, results) {
                    if (error) {
                        return res.sendStatus(500);
                    }
                    res.sendStatus(200);
                });
                break;
            }
            case 'classrooms':
            {
                db.query('UPDATE ' + type + ' SET `capacity` = ?, `number` = ? WHERE ' + id_type + '_id = ' + id, [data.capacity, data.number], function (error, results) {
                    if (error) {
                        return res.sendStatus(500);
                    }
                    res.sendStatus(200);
                });
                break;
            }
        }
    });
    app.put('/admin/create', function(req, res){
        var type = req.query.type;
        var id_type = type.substring(0, type.length - 1) + '_id';
        var title = req.query.title;
        var id = req.query.id;
        db.query('INSERT INTO ' + type + '_subjects (' + id_type + ',subject_id) VALUES('+id + ', (SELECT subject_id FROM subjects WHERE `title`=\''+title+'\'))' , function(err,result){
            if (err){
                console.log(err);
                return res.sendStatus(500);
            } else {
                res.send(result);
            }
        })
    });
    app.post('/admin/create', json, function(req, res){
        var type = req.query.type;
        var data = req.body;
        db.query('INSERT INTO ' + type + ' SET ?', data, function(err,result){
            if (err){
                console.log(err);
                return res.sendStatus(500);
            } else {
                res.send(result);
            }
        })
    });
};
