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
            console.log($routeParams.tokenstring);

            Auth.saveToken($routeParams.tokenstring, function(){
                User.validateToken()
                    .then(function(response) {
                        console.log(response.data);
                        //if (response.data.success) {
                            var id = Auth.getUserId();
                            console.log("login successfully!");
                            window.location = "#/user/" + id;
                            //need to change to actual userID
                       // }
                        //else {
                        //    $window.sessionStorage.removeItem('jwtToken');
                        //    window.location = "#/login";
                        //    alert("invalid token");
                        //}

                    });
            });


        }
        init();

        // validate the token https://crucore.com/api.php?a=validate

        ////$scope.token = $localStorage.token;

    }
})();