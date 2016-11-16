angular.module('app.service')
    .service('share', function(){
        stState = 'courses';
        return {
            getStudentState: function () {
                return stState;
            },
            setStudentState: function (value) {
                stState = value;
            }
        }
    });
