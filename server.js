var express = require('express');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var app = express();
app.use(express.static(__dirname + '/'));
app.listen(process.env.PORT || 63333);
var mysql = require('mysql');
require('./env.js');
var connection = mysql.createConnection({
    host     : process.env.HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_DATABASE
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
    require('./dbFillTestQuery/createMarksTable')(connection);
    require('./dbFillTestQuery/createStudentsSubjectsTable')(connection);
    require('./dbFillTestQuery/createClassroomsTable')(connection);
    require('./dbFillTestQuery/createProfessorsTable')(connection);
    require('./dbFillTestQuery/createProfessorsSubjectsTable')(connection);
    require('./dbFillTestQuery/createStudentsSubjectsTable')(connection);
    require('./dbFillTestQuery/addColumnToStudentsTable')(connection);
    require('./dbFillTestQuery/addNameColumnToStudentsTable')(connection);
    require('./dbFillTestQuery/fillStudentsTable')(connection);
    require('./dbFillTestQuery/fillSubjectsTable')(connection);
    require('./dbFillTestQuery/fillProfessorsTable')(connection);
    require('./dbFillTestQuery/fillSubjectStudentTable')(connection);
    require('./dbFillTestQuery/fillProfessorSubjectTable')(connection);
    require('./dbFillTestQuery/fillClassroomsTable')(connection);
    require('./dbFillTestQuery/fillSubjectStudentTable')(connection);

 */


//require('./dbFillTestQuery/createCheckRoomTrigger')(connection);
//require('./dbFillTestQuery/createStudentsSubjectsTable')(connection);

//require('./dbFillTestQuery/fillSubjectStudentTable')(connection);
//require('./dbFillTestQuery/createCheckRoomTriggerOnUpdate')(connection);

require('./routes/subjectAPI')(app,connection);
require('./routes/teacherAPI')(app,connection, jsonParser);
require('./routes/auth')(app,connection);
require('./routes/studentAPI')(app,connection);
require('./routes/roomsAPI')(app,connection);
require('./routes/adminAPI')(app,connection, jsonParser);
app.get('/',function(req,res){
    res.sendFile(__dirname + '/index.html');
});
