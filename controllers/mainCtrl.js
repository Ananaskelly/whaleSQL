/**
 * Created by Ananasy on 14.11.2016.
 */
angular.module('app.controller', ['app.service'])
    .controller('mainCtrl', function($scope, content, $state, $rootScope, $cookies){
        $scope.state = {};
        $scope.user = {};
        $scope.setState = function(type){
            $scope.state.type = type;
        };
        $scope.logIn = function(){
            var userInfo = {
                id: $scope.user.id
            };
            if ($scope.user.password){
                userInfo.hash = CryptoJS.MD5($scope.user.password).toString(CryptoJS.enc.Base64);
            }
            content.auth($scope.state.type,userInfo).then(
                function(response){
                    console.log(response);
                    $cookies.putObject('user', JSON.stringify(response));
                    $cookies.put('level',$scope.state.type);
                    $state.go('profile_'+$scope.state.type,{'type': $scope.state.type, 'id': response.unikey})
                },
                function(error){
                    console.log(error);
                }
            )
        }
    });