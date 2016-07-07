/**
 * Created by yangyang on 6/30/16.
 */
(function () {
    angular
        .module("myApp")
        .controller("ContactController", ContactController);

    function ContactController(Activity){
        var vm = this;

        vm.contactUs = contactUs;

        function contactUs(data){

            data.post_actions = "support";
            console.log(data);

            Activity.contactUs(data)
                .then(
                    function (res){
                        vm.msg = res.data.msg;
                    },
                    function(error){
                        alert("You are at Failure");
                    }
                )



        }
    }
})();