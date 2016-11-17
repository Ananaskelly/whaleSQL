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
            }
        }
    });
