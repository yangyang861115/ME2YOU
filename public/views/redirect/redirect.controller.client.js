/**
 * Created by yangyang on 4/24/16.
 */
(function(){
    angular
        .module("escomm")
        .controller("RedirectController", redirectController);
    function redirectController ($routeParams, $window, User, Auth) {
        var vm = this;

        function init(){
            //vm.token = $routeParams.tokenstring;
            Auth.saveToken($routeParams.tokenstring, function(){
                User.validateToken()
                    .then(function(response) {

                        if (response.data.success) {
                            console.log("login successfully!");
                            window.location = "#/user/123/";
                            //need to change to actual userID
                        }
                        else {
                            $window.localStorage.removeItem('jwtToken');
                            window.location = "#/login";
                            alert("invalid token");
                        }

                    });
            });


        }
        init();

        // validate the token https://crucore.com/api.php?a=validate

        ////$scope.token = $localStorage.token;

    }
})();