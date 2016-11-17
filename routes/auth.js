module.exports = function(app, db){
    app.get('/auth/api/:id', function(req,res){
        var unikey = req.params.id;
        var password = decodeURIComponent(req.query.hash).replace(" ","+");
        switch (req.query.type) {
            case 'student': {
                db.query('SELECT * FROM students WHERE unikey = ?', unikey, function (error, results, fields) {
                    if (error) {
                        res.sendStatus(500);
                    }
                    if (results.length > 0) {
                        res.send(results[0]);
                    }
                });
                break;
            }
            case 'teacher': {
                db.query('SELECT * FROM professors WHERE unikey = ? AND password = ?', [unikey, password],
                    function (error, results, fields) {
                    if (error) {
                        res.sendStatus(500);
                    }
                    if (results.length > 0) {
                        res.send(results[0]);
                    }
                });
                break;
            }

        }
    })
};