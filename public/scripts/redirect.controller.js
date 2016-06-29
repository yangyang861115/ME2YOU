/**
 * Created by yangyang on 4/24/16.
 */
(function(){
    angular
        .module("myApp")
        .controller("RedirectController", redirectController);
    function redirectController ($routeParams, $window, User, Auth) {
        var vm = this;

        function init(){
            //vm.token = $routeParams.tokenstring;
            Auth.saveToken($routeParams.tokenstring, function(){
                User.validateToken()
                    .then(function(response) {

                        if (response && response.data.success) {
                            console.log("login successfully!");
                            window.location = "#/user";
                        }
                        else {
                            $window.sessionStorage.removeItem('jwtToken');
                            alert("invalid token");
                            window.location = "#/login";
                        }

                    });
            });


        }
        init();

        // validate the token https://crucore.com/api.php?a=validate

        ////$scope.token = $localStorage.token;

    }
})();