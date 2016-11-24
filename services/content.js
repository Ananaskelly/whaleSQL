angular.module('app.service', [])
    .service('content', function($q, $http){
        return {
            adminGET : function(type){
                var getPromise = $q.defer();
                $http({
                    'method': 'GET',
                    'url': '/admin/api/'+type
                }).then(function(response){
                        getPromise.resolve(response.data);
                    },
                    function(error){
                        getPromise.reject(error)
                    }
                );
                return getPromise.promise;
            },
            adminDELETE : function(type, id){
                var getPromise = $q.defer();
                $http({
                    'method': 'DELETE',
                    'url': '/admin/api?type=' + type + '&id=' +id
                }).then(function(response){
                        getPromise.resolve(response.data);
                    },
                    function(error){
                        getPromise.reject(error)
                    }
                );
                return getPromise.promise;
            },
            adminUPDATE : function(data,type){
                var getPromise = $q.defer();
                $http({
                    'method': 'PUT',
                    'data': data,
                    'url': '/admin/api/' + type
                }).then(function(response){
                        getPromise.resolve(response.data);
                    },
                    function(error){
                        getPromise.reject(error)
                    }
                );
                return getPromise.promise;
            },
            adminDELETE_R : function(type, title, id){
                var getPromise = $q.defer();
                $http({
                    'method': 'DELETE',
                    'url': '/admin/special/api?type=' + type + '&title=' + title + '&id=' + id
                }).then(function(response){
                        getPromise.resolve(response.data);
                    },
                    function(error){
                        getPromise.reject(error)
                    }
                );
                return getPromise.promise;
            },
            adminGET_Subjects : function(){
                var getPromise = $q.defer();
                $http({
                    'method': 'GET',
                    'url': '/admin/help/subjects'
                }).then(function(response){
                        getPromise.resolve(response.data);
                    },
                    function(error){
                        getPromise.reject(error)
                    }
                );
                return getPromise.promise;
            },
            adminCREATE_R : function(type, title, id){
                var getPromise = $q.defer();
                $http({
                    'method': 'PUT',
                    'url': '/admin/create?type='+ type + '&title=' + title + '&id=' + id
                }).then(function(response){
                        getPromise.resolve(response.data);
                    },
                    function(error){
                        getPromise.reject(error)
                    }
                );
                return getPromise.promise;
            },
            adminCREATE_O : function(type, data){
                var getPromise = $q.defer();
                $http({
                    'method': 'POST',
                    'data': data,
                    'url': '/admin/create?type='+ type
                }).then(function(response){
                        getPromise.resolve(response.data);
                    },
                    function(error){
                        getPromise.reject(error)
                    }
                );
                return getPromise.promise;
            },
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
                        getPromise.reject(error)
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
            sendMark: function(data){
                var postPromise = $q.defer();
                $http({
                    'method': 'POST',
                    'data': data,
                    'url': '/teacher/api/send/mark'
                }).then(function(response){
                        postPromise.resolve(response.data)
                    },
                    function(error){
                        postPromise.reject(error)
                    }
                );
                return postPromise.promise;
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
