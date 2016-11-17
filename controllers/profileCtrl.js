angular.module('app.controller')
    .controller('profileCtrl', function($scope,$cookies, share){
        $scope.user = {};
        $scope.stState = 'courses';
        $scope.level = $cookies.get('level');
        if ($cookies.get('user')){
            $scope.user = JSON.parse($cookies.getObject('user'));
        }
        $scope.changeState = function(value){
            share.setStudentState(value);
            $scope.stState = value;
        }
    });
