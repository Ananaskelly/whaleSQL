angular.module('app.controller')
    .controller('adminCtrl', function($scope, content){
        /**
         * State params, default info
         */
        $scope.adminState = 'students';
        $scope.state = 'students';
        getInfo('students');

        /**
         * Default parameters
         */
        $scope.disabledFields = ['student_id', 'professor_id', 'classrooms_id', 'titles', 'password'];
        $scope.createObjectFields = {
            'classrooms': ['number','capacity'],
            'students': ['name', 'unikey', 'grade', 'student_group'],
            'professors': ['name', 'unikey', 'password'],
            'subjects': ['title']
        };

        $scope.data = {};
        $scope.updItem = {};
        $scope.updItemSubjects = [];
        $scope.createObj = {};
        $scope.createCategory = '';

        $scope.changeState = function(value) {
            $scope.adminState = value;
            $scope.state = value;
            $scope.data = {};
            getInfo(value);
        };
        $scope.deleteItem = function(id){
            content.adminDELETE($scope.adminState, id).then(function(response){
                getInfo($scope.adminState);
            })
        };
        $scope.deleteSubjRelation = function(title){
            var id_key = $scope.state.substr(0,$scope.state.length - 1)+'_id';
            var id = $scope.updItem[id_key];
            content.adminDELETE_R($scope.state, title,id).then(function(){
                $scope.updItemSubjects.splice($scope.updItemSubjects.indexOf(title),1);
            });
        };
        $scope.updateItem = function(ind){
            $scope.adminState = 'update';
            $scope.updItem = $scope.data[ind];
            if ($scope.updItem.titles) {
                $scope.updItemSubjects = $scope.updItem.titles.split(',');
            }
        };

        $scope.saveUPD = function(){
            content.adminUPDATE($scope.updItem, $scope.state).then(function(response){
                $scope.adminState = $scope.state;
            });
        };

        $scope.createRelation = function(title) {
            var id_key = $scope.state.substr(0,$scope.state.length - 1)+'_id';
            var id = $scope.updItem[id_key];
            content.adminCREATE_R($scope.state, title, id).then(function(){
                $scope.updItemSubjects.push(title);
            })
        };
        $scope.openSubjects = function() {
            content.adminGET_Subjects().then(function(response){
                $scope.data = response;
            });
        };

        $scope.chooseC_Category = function(category){
            $scope.createCategory = category;
        };

        $scope.create = function(){
            content.adminCREATE_O($scope.createCategory, $scope.createObj).then(function(){
                $scope.state = $scope.createCategory;
                $scope.adminState = $scope.createCategory;
                $scope.createObj = {};
            })
        };

        function getInfo(type){
            content.adminGET(type).then(function(response){
                $scope.data = response;
                console.log(response);
            })
        }

    });
