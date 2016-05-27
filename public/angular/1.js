/**
 * Created by yangyang on 5/26/16.
 */
angular.module('escomm').factory('myInterceptor', [
    function() {
        var myInterceptor;
        myInterceptor = {
            'request': function(config) {
                return config;
            },
            'requestError': function(rejection) {
                var d;
                if (resp.status === 401) {
                    d = $q.defer();
                    storageService.logout();
                    $location.url("/");
                    $scope.$broadcast("notify", {
                        message: "Sorry, an authentication error has occurred."
                    });
                    return d.promise;
                }
                $q.reject(resp);
                if (canRecover(rejection)) {
                    return responseOrNewPromise;
                }
                return $q.reject(rejection);
            },
            'response': function(response) {
                return response;
            },
            'responseError': function(rejection) {
                if (canRecover(rejection)) {
                    return responseOrNewPromise;
                }
                return $q.reject(rejection);
            }
        };
        return myInterceptor;
    }
]);

angular.module('escomm').config([
    '$httpProvider', function($httpProvider) {
        $httpProvider.interceptors.push('myInterceptor');
    }
]);
