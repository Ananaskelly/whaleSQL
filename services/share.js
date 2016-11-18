angular.module('app.service')
    .service('share', function(){
        stState = 'courses';
        return {
            getCurrentState: function () {
                return stState;
            },
            setCurrentState: function (value) {
                stState = value;
            }
        }
    });
