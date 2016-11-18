angular.module('app.service', [])
    .service('content', function($q, $http){
        return {
            auth: function(type,userInfo){
                var getPromise = $q.defer();
                $http({
                    'method': 'GET',
                    'url': '/auth/api/'+userInfo.id+'?type='+type+'&hash='+userInfo.hash
                }).then(function(response){
                        getPromise.resolve(response.data)
                    },
                    function(error){
                        getPromise.reject(error)
                    }
                );
                return getPromise.promise;
            },
            getStudentInfo: function(studentId, type){
                var getPromise = $q.defer();
                $http({
                    'method': 'GET',
                    'url': '/student/api/'+type+'/'+studentId
                }).then(function(response){
                        getPromise.resolve(response.data)
                    },
                    function(error){
                        getPromise.resolve(error)
                    }
                );
                return getPromise.promise;
            },
            getTeacherInfo: function(teacherId, type){
                var getPromise = $q.defer();
                $http({
                    'method': 'GET',
                    'url': '/teacher/api/'+type+'/'+teacherId
                }).then(function(response){
                        getPromise.resolve(response.data)
                    },
                    function(error){
                        getPromise.resolve(error)
                    }
                );
                return getPromise.promise;
            },
            getSubjectInfo: function(subjectTitle){
                var getPromise = $q.defer();
                $http({
                    'method': 'GET',
                    'url': '/subject/api/'+subjectTitle
                }).then(function(response){
                        getPromise.resolve(response.data)
                    },
                    function(error){
                        getPromise.resolve(error)
                    }
                );
                return getPromise.promise;
            },
            getAllRooms: function(){
                var getPromise = $q.defer();
                $http({
                    'method': 'GET',
                    'url': '/rooms/api'
                }).then(function(response){
                        getPromise.resolve(response.data)
                    },
                    function(error){
                        getPromise.resolve(error)
                    }
                );
                return getPromise.promise;
            },
            updateMark: function(data){
                var postPromise = $q.defer();
                $http({
                    'method': 'PUT',
                    'data': data,
                    'url': '/teacher/api/update/mark'
                }).then(function(response){
                        postPromise.resolve(response.data)
                    },
                    function(error){
                        postPromise.reject(error)
                    }
                );
                return postPromise.promise;
            },
            deleteMark: function(id){
                var postPromise = $q.defer();
                $http({
                    'method': 'DELETE',
                    'url': '/teacher/api/delete/mark/'+id
                }).then(function(response){
                        postPromise.resolve(response.data)
                    },
                    function(error){
                        postPromise.reject(error)
                    }
                );
                return postPromise.promise;
            }
        }
    });
