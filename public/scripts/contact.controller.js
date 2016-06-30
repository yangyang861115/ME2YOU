/**
 * Created by yangyang on 6/30/16.
 */
(function () {
    angular
        .module("myApp")
        .controller("ContactController", ContactController);

    function ContactController(){
        var vm = this;

        vm.contactUs = contactUs;

        function contactUs(data){
            console.log(data);
        }
    }
})();