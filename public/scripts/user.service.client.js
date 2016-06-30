/**
 * Created by yangyang on 3/31/16.
 */
(function () {
    angular
        .module("myApp")
        .factory('User', user);
    function user($http, Auth) {
        var BASE_URL = "https://crucore.com/api.php?a=";

        var api = {
            signUp: signUp,
            checkEmail: checkEmail,
            checkUsername: checkUsername,
            signIn: signIn,
            getCodeByEmail: getCodeByEmail,
            subEmailCode: subEmailCode,
            validateToken: validateToken,
            getProfile: getProfile,
            updateProfile: updateProfile,
            getCountryList: getCountryList
            //getUserId: getUserId
        };


        //function getUserId() {
        //    var token = $window.sessionStorage['jwtToken'];
        //    var part = Auth.parseJwt(token);
        //    return part.
        //
        //}

        function signUp(data) {
            var url = BASE_URL + "newuser";
            console.log(data);
            return $http.post(url, data);
        }

        function checkEmail(data) {
            var url = BASE_URL + "popfind";
            return $http.post(url, data);
        }

        function checkUsername(data) {
            var url = BASE_URL + "popfind";
            return $http.post(url, data);
        }

        function getCountryList(data) {
            var url = BASE_URL + "popfind";
            return $http.post(url, data);
        }

        function signIn(data) {
            var url = BASE_URL + "login";
            return $http.post(url, data);
        }


        function getCodeByEmail(email) {
            var data = {
                email: email
            };
            var url = BASE_URL + "sendEmail";
            return $http.post(url, data);
        }

        function subEmailCode(data) {
            var url = BASE_URL + "entercode";
            return $http.post(url, data);
        }

        function validateToken() {
            var url = BASE_URL + "validate";
            return $http.get(url);
        }

        function getProfile() {
            var url = BASE_URL + "profile";
            return $http.get(url);
        }

        function updateProfile(data) {
            var url = BASE_URL + "profile";
            return $http.post(url, data);
        }

        return api;
    }

})();