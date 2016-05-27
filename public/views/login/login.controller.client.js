/**
 * Created by yangyang on 3/31/16.
 */
(function () {
    angular
        .module("escomm")
        .controller("LoginController", LoginController);

    function LoginController(){
        var vm = this;
        vm.oneAtATime = true;

        vm.status = {
            isFirstOpen: true,
            isSecondOpen: false,
            isThirdOpen: false,
            isFourthOpen:false
        };

        vm.PASSWORD_PATTERN = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{7,}$/;
        vm.EMAIL_PATTERN = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
        vm.USERNAME_PATTERN= /^[a-zA-Z0-9\.@_]{6,30}$/;


        //vm.getCodeByEmail = getCodeByEmail;
        vm.showCreateLogin = showCreateLogin;

        function showCreateLogin(){
            vm.createUser=true;
            vm.status.isSecondOpen = false;
            vm.status.isFourthOpen = true;
        }
    }
})();