module.exports = function(db){
    db.query('ALTER TABLE students ADD name VARCHAR(255) NOT NULL;', function(error,result,fields){
        console.log(error);
    })
};
