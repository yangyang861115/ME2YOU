/**
 * Created by yangyang on 3/31/16.
 */
(function () {
    angular
        .module("escomm")
        .factory('Auth', auth);
    function auth($window) {

        var api = {
            parseJwt: parseJwt,
            saveToken: saveToken,
            getToken: getToken,
            getUserId: getUserId,
            isAuthed: isAuthed,
            logout: logout
        }

        // Add JWT methods here
        function parseJwt(token) {
            var base64Url = token.split('.')[1];
            var base64 = base64Url.replace('-', '+').replace('_', '/');
            return JSON.parse($window.atob(base64));
        };

        function saveToken(token, callback) {
            $window.sessionStorage['jwtToken'] = token;
            if (callback) {
                callback();
            }

        };

        function getToken() {
            return $window.sessionStorage['jwtToken'];
        };

        function getUserId() {
            var token = getToken();
            var uid = null;
            if(token) {
                var params = parseJwt(token);
                uid = params.id;
            }
            return uid;
        }

        function isAuthed() {
            var token = getToken();
            if (token) {
                //var params = self.parseJwt(token);
                //return Math.round(new Date().getTime() / 1000) <= params.exp;
                return true;
            } else {
                return false;
            }
        };

        function logout() {
            $window.sessionStorage.removeItem('jwtToken');
            window.location = "#/login";
        }

        return api;
    }

})();