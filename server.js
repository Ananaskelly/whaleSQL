var express = require('express');
var app = express();
app.use(express.static(__dirname + '/'));
app.listen(process.env.PORT || 63333);
var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'whale',
    password : 'bazzingapank73',
    database : 'SPbSU'
});
connection.connect(function(err) {
    if (err) {
        console.error('Error: ' + err.stack);
        return;
    }
    console.log('Connected successfully: ' + connection.threadId);
});
/*
    require('./dbFillTestQuery/createStudentsTable')(connection);
    require('./dbFillTestQuery/createSubjectsTable')(connection);
    require('./dbFillTestQuery/createStudentsSubjectsTable')(connection);
    require('./dbFillTestQuery/createStudentsSubjectsTable')(connection);
    require('./dbFillTestQuery/createClassroomsTable')(connection);
    require('./dbFillTestQuery/createProfessorsTable')(connection);
    require('./dbFillTestQuery/addColumnToStudentsTable')(connection);
    require('./dbFillTestQuery/addNameColumnToStudentsTable')(connection);
    require('./dbFillTestQuery/fillStudentsTable')(connection);
    require('./dbFillTestQuery/fillSubjectsTable')(connection);
    require('./dbFillTestQuery/fillSubjectStudentTable')(connection);
    require('./dbFillTestQuery/fillSubjectStudentTable')(connection);
    require('./dbFillTestQuery/fillClassroomsTable')(connection);
 */

require('./routes/auth')(app,connection);
require('./routes/studentAPI')(app,connection);

app.get('/',function(req,res){
    res.sendFile(__dirname + '/index.html');
});
