module.exports = function(app, db){
    app.get('/rooms/api', function(req,res){
        db.query('SELECT * FROM classrooms', function(error, results, fields){
            if (error){
                return res.sendStatus(500);
            }
            res.send(results);
        })
    });
};