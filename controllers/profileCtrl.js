angular.module('app.controller')
    .controller('profileCtrl', function ($scope, $cookies, share, content) {
        $scope.user = {};
        $scope.stState = 'courses';
        $scope.level = $cookies.get('level');
        $scope.$watch(function () { return share.getCurrentState(); }, function (newValue, oldValue) {

            if (newValue != null && newValue) {
                $scope.stState = newValue;
            }
        }, true);

        if ($cookies.get('user')) {
            $scope.user = JSON.parse($cookies.getObject('user'));
        }

        $scope.changeState = function (value) {
            share.setCurrentState(value);
            $scope.stState = value;
        };
        if ($scope.level === 'student') {
            content.getStudentInfo($scope.user.student_id, 'gpa').then(function (response) {
                $scope.userParam = response.result;
            });
        }
    });
