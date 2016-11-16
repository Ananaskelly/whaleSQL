angular.module('app.controller')
    .controller('navCtrl', function($scope, $cookies, $state){
        $scope.logOut = function(){
            $cookies.remove('user');
            $state.go('main');
        }
    });