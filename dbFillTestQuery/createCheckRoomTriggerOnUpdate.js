module.exports = function (db) {
    db.query('CREATE TRIGGER check_room_capacity_on_update ' +
        'BEFORE UPDATE ON marks ' +
        'FOR EACH ROW ' +
        'BEGIN ' +
        '   IF ((SELECT capacity FROM classrooms WHERE classroom_id = new.room_number) < (SELECT COUNT(*)' +
        '       FROM students_subjects WHERE subject_id = new.subject_id))' +
        '   THEN SIGNAL SQLSTATE \'45000\' SET MESSAGE_TEXT = \'NOT ALLOWED\'; ' +
        '   END IF; ' +
        'END;',
        function (error) {
            if (error){
                console.log(error);
            }
        });
};