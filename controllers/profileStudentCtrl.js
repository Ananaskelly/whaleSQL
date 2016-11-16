angular.module('app.controller')
    .controller('profileStudentCtrl', function($scope,$cookies, content, share){
        $scope.stState = share.getStudentState();

        $scope.$watch(function () { return share.getStudentState(); }, function (newValue, oldValue) {
            if (newValue != null) {
                $scope.stState = newValue;
                getInfo();
            }
        }, true);
        var user = {};
        $scope.data = {};
        if ($cookies.get('user')){
            user = JSON.parse($cookies.getObject('user'));
        }
        function getInfo() {
            content.getStudentInfo(user.student_id, $scope.stState).then(function (response) {
                $scope.data = response;
            });
        }
        getInfo();

    });
