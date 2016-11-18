angular.module('app.controller')
    .controller('profileTeacherCtrl', function ($scope, $cookies, share, content) {
        $scope.pState = share.getCurrentState();

        $scope.$watch(function () { return share.getCurrentState(); }, function (newValue, oldValue) {

            if (newValue != null && newValue != $scope.pState) {
                $scope.pState = newValue;
                getInfo();
            }
        }, true);

        var user = {};
        $scope.data = {};
        $scope.mark = {};
        $scope.mark.date = {};
        $scope.mark.date.year = new Date().getFullYear();
        $scope.days = [];
        $scope.noValidFlag = false;
        var updateFlag = false;
        for (var i = 1; i < 32; i++) {
            if (i < 10) {
                i = '' + 0 + i;
            }

            $scope.days.push(i.toString());
        }

        if ($cookies.get('user')) {
            user = JSON.parse($cookies.getObject('user'));
        }

        function getInfo(additional) {
            if (!additional) {
                additional = $scope.pState;
            }

            content.getTeacherInfo(user.professor_id, additional).then(function (response) {
                $scope.data = response;
                console.log($scope.data);
            });
        }

        function getSubjectInfo(subjectTitle) {
            content.getSubjectInfo(subjectTitle, $scope.pState).then(function (response) {
                $scope.data = response;
                console.log(response);
            });
        }

        getInfo();

        $scope.subjectInfo = function (value, subject) {
            share.setCurrentState(value);
            $scope.pState = value;
            getSubjectInfo(subject);
        };

        $scope.openSubjects = function () {
            getInfo('courses');
        };

        $scope.openRooms = function () {
            content.getAllRooms().then(function (response) {
                $scope.data = response;
            });
        };

        $scope.setParam = function (key, value) {
            $scope.mark[key] = value;
        };

        $scope.setDate = function (key, value) {
            $scope.mark.date[key] = value;
        };

        $scope.openStudents = function () {
            getSubjectInfo($scope.mark.subject);
        };

        $scope.sendMark = function () {
            if (!$scope.mark.subject || !$scope.mark.student || !$scope.mark.mark_value || !$scope.mark.room) {
                $scope.noValidFlag = true;
                return;
            }

            $scope.noValidFlag = false;
            var mark = {};
            angular.copy($scope.mark, mark);
            mark.date = '' + mark.date.year + mark.date.month + mark.date.day;
            mark.professor_id = user.professor_id;
            if (!updateFlag) {
                content.sendMark(mark).then(function () {
                    $scope.mark = {};
                    $scope.mark.date.year = new Date().getFullYear();
                }, function () {

                    $scope.noValidFlag = true;
                });
            } else {
                content.updateMark(mark).then(function () {
                    $scope.mark = {};
                    $scope.mark.date.year = new Date().getFullYear();
                }, function () {

                    $scope.noValidFlag = true;
                });

                updateFlag = false;
                $scope.pState = 'journal';
                getInfo();
                share.setCurrentState('journal');
            }

        };

        $scope.deleteMark = function (id) {
            content.deleteMark(id).then(function () {
                getInfo();
            });
        };

        $scope.updateMark = function (index) {
            updateFlag = true;
            var chosenMark = $scope.data[index];
            var date = new Date(chosenMark.date);
            $scope.mark = {
                subject: chosenMark.title,
                student: chosenMark.name,
                mark_value: chosenMark.mark_value,
                room: chosenMark.number,
                id: chosenMark.mark_id,
            };
            $scope.mark.date = {};
            $scope.mark.date.day = date.getDate();
            if (date.getDate() < 10) {
                $scope.mark.date.day = '' + 0 + $scope.mark.date.day;
            }

            $scope.mark.date.month = date.getMonth() + 1;
            if (date.getMonth() < 10) {
                $scope.mark.date.month = '' + 0 + $scope.mark.date.month;
            }

            $scope.mark.date.year = date.getFullYear();
            $scope.pState = 'add_mark';
            share.setCurrentState('add_mark');
        };
    });
