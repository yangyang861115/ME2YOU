/**
 * Created by yangyang on 7/6/16.
 */
(function () {
    angular
        .module("myApp")
        .factory('Activity', activity);

    function activity($http) {
        var BASE_URL = "https://crucore.com/api.php?a=";

        var api = {
            contactUs: contactUs,
            getActivitiesByUserId: getActivitiesByUserId,
            sendNewInvite: sendNewInvite,
            reinvite: reinvite,
            removeInviteById: removeInviteById

        };
        return api;

        function contactUs(data){
            return $http.post("https://crucore.com/api.php", data);
        }

        function getActivitiesByUserId(userId){
            var data = {
                id: parseInt(userId)
            };
            var url = BASE_URL + "activity";
            return $http.post(url, data);
        }

        function sendNewInvite(data){
            var url = BASE_URL + "invite";
            return $http.post(url, data);
        }

        function reinvite(data){
            var url = BASE_URL + "reinvite";
            return $http.post(url, data);
        }

        function removeInviteById(data){
            var url = BASE_URL + "remove";
            return $http.delete(url, data);
        }
    }
})();