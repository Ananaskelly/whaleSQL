module.exports = function(app, db){
    app.get('/auth/api/:id', function(req,res){
        var unikey = req.params.id;
        if (req.query.type === 'student') {
            db.query('SELECT * FROM students WHERE unikey = ?', unikey, function(error, results, fields){
                if (error){
                    res.sendStatus(500);
                }
                if (results.length > 0){
                    res.send(results[0]);
                }
            })
        }
    })
};