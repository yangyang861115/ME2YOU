/**
 * Created by yangyang on 5/27/16.
 */
(function(){
    angular
        .module("escomm")
        .controller("MainController", MainController);

    function MainController($scope, User, Auth, $rootScope,$sce) {
        var vm = this;
        vm.uid = Auth.getUserId();

        vm.isAuthed = function () {
            return Auth.isAuthed();
        }

        function successAuth(token) {
            Auth.saveToken(token, function(){
                vm.uid = Auth.getUserId();
                window.location = "#/user/" + vm.uid;
            });
        }

        vm.signin = function (formData) {
            User.signin(formData)
                .then(function (response) {
                    if (response.data.success) {
                        console.log("login successfully!");
                        var token = response.data.token;
                        successAuth(token);
                    }
                    else {
                        $scope.pdErrorMsg = response.data.error;
                    }
                });
        };

        vm.getCodeByEmail = function (email) {
            console.log(email);
            Auth.getCodeByEmail(email)
                .then(function (response) {
                    console.log(response.data);
                    if (response.data.success) {
                        console.log("get email code successfully!");
                    }
                    else {
                        $scope.emlErrorMsg = response.data.error;
                    }
                });
        }

        vm.signup = function () {
            var formData = {
                email: $scope.email,
                password: $scope.password
            };

            Auth.signup(formData, successAuth, function (res) {
                $rootScope.error = res.error || 'Failed to sign up.';
            })
        };


        vm.loginBySocialMedia = function(method) {
            console.log(method);
            User.loginBySocialMedia(method)
                .then(function(response) {
                    console.log(response.data);
                });
        }

        vm.logout = function () {
            Auth.logout();
        }

        vm.renderHtml = function (html_code) {
            return $sce.trustAsHtml(html_code);
        }
    }
})();