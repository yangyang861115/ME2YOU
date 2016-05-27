/**
 * Created by yangyang on 3/31/16.
 */
(function () {
    angular
        .module("escomm")
        .factory('User', user);
    function user($http) {

        var api = {
            signup: signup,
            signin: signin,
            loginBySocialMedia: loginBySocialMedia,
            getCodeByEmail: getCodeByEmail,
            validateToken: validateToken,
            getProfile: getProfile,
            updateProfile: updateProfile
        }


        function signup(data, success, error) {
            var url = "no url yet";
            $http.post(url, data).success(success).error(error)
        }

        function signin(data) {
            var url = "https://crucore.com/api.php?a=login";
            return $http.post(url, data);
        }

        function loginBySocialMedia(method){
            var url = "https://crucore.com/index.php?a=social_" + method;
            return $http.post(url);
        }


        function getCodeByEmail(email) {
            var url = "https://crucore.com/api.php?a=sendEmail";
            return $http.post(url, email);
        }

        function validateToken(){
            var url = "https://crucore.com/api.php?a=validate";
            return $http.get(url);
        }

        function getProfile(){
            var url = "https://crucore.com/api.php?a=profile";
            return $http.get(url);
        }

        function updateProfile(data){
            var url = "https://crucore.com/api.php?a=profile";
            return $http.post(url, data);
        }

        return api;
    }

})();