angular.module('app.controller')
    .controller('profileCtrl', function ($scope, $cookies, share) {
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
    });
