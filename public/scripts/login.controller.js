/**
 * Created by yangyang on 3/31/16.
 */
(function () {
    angular
        .module("myApp")
        .controller("LoginController", LoginController);

    function LoginController($location) {
        var vm = this;

        vm.oneAtATime = true;

        vm.status = {
            isFirstOpen: true,
            isSecondOpen: false,
            isThirdOpen: false,
            isFourthOpen: false
        };

        vm.PASSWORD_PATTERN = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{7,}$/;
        vm.EMAIL_PATTERN = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
        vm.USERNAME_PATTERN = /^[a-zA-Z0-9\.@_]{6,30}$/;
        vm.SIXCNT_PATTERN = /^[0-9]{6,6}$/;

        //check sign in / sign up
        var url = $location.url();
        if(url == "/signup") {
            showCreateLogin()
        }


        vm.showCreateLogin = showCreateLogin;
        vm.showEmailCode = showEmailCode;
        vm.showLoginAgain = showLoginAgain;
        vm.resetEmail = resetEmail;

        function reset() {
            vm.createUser = false;
            vm.status = {
                isFirstOpen: true,
                isSecondOpen: false,
                isThirdOpen: false,
                isFourthOpen: false
            };
        }

        function showCreateLogin() {
            vm.createUser = true;
            vm.status.isSecondOpen = false;
            vm.status.isFourthOpen = true;
        }

        function showEmailCode() {
            reset();
            vm.status.isFirstOpen = false;
            vm.status.isThirdOpen = true;
            return true;
        }

        function showLoginAgain() {
            reset();
        }

        function resetEmail() {
            vm.usrForm.email = "";
            return true;

        }

    }
})();