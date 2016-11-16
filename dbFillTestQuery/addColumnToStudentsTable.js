module.exports = function(db){
    db.query('ALTER TABLE students ADD unikey INT UNSIGNED;', function(error,result,fields){
        console.log(error);
    })
};