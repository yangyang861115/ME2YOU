/**
 * Created by yangyang on 7/6/16.
 */
(function () {
    angular
        .module("myApp")
        .controller("ActivityController", activityController);

    function activityController(Auth, Activity, $location, $scope, $route) {
        var vm = this;
        vm.userId = Auth.getUserId();

        function init(){
            Activity.getActivitiesByUserId(vm.userId)
                .then(
                    function(response) {
                        vm.activities = response.data;
                    },
                    function(error) {}
                );
        }

        var url = $location.url();
        if(url == "/user/contacts_activity") {
            init();
        }

        vm.sendInvite = sendInvite;
        vm.reinvite = reinvite;
        vm.remove = remove;
        vm.refreshPage = refreshPage;

        function sendInvite(form){
            vm.showSendingBtn = true;
            form.id = parseInt(vm.userId);
            console.log(form);
            Activity.sendNewInvite(form)
                .then(
                    function(response) {
                        vm.msg = response.data.msg;
                        $scope.invitation.$setPristine();
                        vm.form = {};
                        vm.showSendingBtn = false;
                    },
                    function(error) {

                    }
                );


        }

        function reinvite(idx, inID) {
            var data = {
                id: parseInt(vm.userId),
                inID:inID
            };


            Activity.reinvite(data)
                .then(
                    function(response) {
                        vm.activities[idx].lastact = response.data.lastact;
                        vm.activities[idx].action = "<button class='btn btn-sm btn-success' disabled='disabled'>Success</button>";
                    },
                    function(error) {}
                );
        }

        function remove(inID) {
            var data = {
                id: parseInt(vm.userId),
                inID: inID
            };
            console.log(inID);
            Activity.removeInviteById(data)
                .then(
                    function(response) {
                        console.log(response.data);
                        alert(response.data.msg);
                        init();
                    },
                    function(error) {}
                );

        }


        function refreshPage(){
            $route.reload();
        }
    }
})();