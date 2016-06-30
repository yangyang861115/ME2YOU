/**
 * Created by yangyang on 3/31/16.
 */
(function () {
    angular
        .module("myApp")
        .factory('Auth', auth);
    function auth($window) {

        var api = {
            parseJwt: parseJwt,
            saveToken: saveToken,
            getToken: getToken,
            isAuthed: isAuthed,
            logout: logout,
            checkAdmin: checkAdmin,
            getUserId: getUserId,
            saveRememberMeCookie: saveRememberMeCookie,
            deleteRememberMeCookie: deleteRememberMeCookie,
            validateRememberMeCookie: validateRememberMeCookie,
            getTokenFromCookie: getTokenFromCookie
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
            deleteRememberMeCookie();
            window.location = "#/";
        }

        function saveRememberMeCookie(token) {
            var cookie = "remember-me=" + token + ";";
            var date = new Date();
            date.setDate(date.getDate() + 7);
            cookie += 'expires=' + date.toString() + ';';
            document.cookie = cookie;
        }

        function deleteRememberMeCookie() {
            var cookie = "remember-me=;";
            cookie += 'expires=' + (new Date()).toString() + ';';
            document.cookie = cookie;
        }

        function validateRememberMeCookie() {
            var cookie = document.cookie;
            if (cookie && cookie.indexOf('remember-me') != -1) {
                return true;
            }
            return false;
        }

        function getTokenFromCookie(){
            var token;
            var cookielist = document.cookie.split(';');
            for(var i in cookielist) {
                if(cookielist[i].indexOf('remember-me') != -1) {
                    //get the token from the cookie list
                    token = cookielist[i].split('=')[1];
                }
            }
            return token;
        }

        function checkAdmin(){
            var token = getToken();
            var payload = parseJwt(token);
            var admin = payload.adm;
            var id = payload.id;
            if(id == admin) return true;
            else return false;
        }

        function getUserId(){
            var token = getToken();
            var payload = parseJwt(token);
            return payload.id;
        }

        return api;
    }

})();