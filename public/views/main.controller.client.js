/**
 * Created by yangyang on 5/27/16.
 */
(function(){
    angular
        .module("escomm")
        .controller("MainController", MainController);

    function MainController(Auth) {
        var vm = this;
        vm.uid = Auth.getUserId();
        console.log(vm.uid);
    }
})();