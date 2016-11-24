/**
 * Created by Ananasy on 14.11.2016.
 */
var bdSPbSu = angular.module('bdSPbSU', ['ui.router', 'app.controller', 'app.service', 'ngCookies'/*'app.directive'*/]);

bdSPbSu.config(function ($stateProvider) {
    $stateProvider.
        state('main', {
            url: '/main',
            views: {
                A: { templateUrl: 'templates/main.html' },
                B: { templateUrl: 'templates/navbar.html' },
            },
            controller: 'mainCtrl',
        }).
        state('profile_student', {
            url: '/profile/student/:id',
            views: {
                A1: {
                    templateUrl: 'templates/profile.html',
                    controller: 'profileCtrl',
                },
                A2: {
                    templateUrl: 'templates/profile_student.html',
                    controller: 'profileStudentCtrl',
                },
                B: { templateUrl: 'templates/navbar.html' },
            },

        }).
        state('profile_teacher', {
            url: '/profile/teacher/:id',
            views: {
                A1: {
                    templateUrl: 'templates/profile.html',
                    controller: 'profileCtrl',
                },
                A2: {
                    templateUrl: 'templates/profile_teacher.html',
                    controller: 'profileTeacherCtrl',
                },
                B: { templateUrl: 'templates/navbar.html' },
            },

        }).
        state('admin', {
            url: '/admin',
            views: {
                A: { templateUrl: 'templates/admin_panel.html' },
                B: { templateUrl: 'templates/navbar.html' },
            },
        });
});

bdSPbSu.run(function ($state, $rootScope) {
    $rootScope.$state = $state;
});
