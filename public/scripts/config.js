/**
 * Created by yangyang on 5/27/16.
 */
(function () {
    'use strict';

    angular
        .module('escomm')
        .config(configuration)
        .run(languageConfig)
        .run(restrict);

    function configuration($routeProvider, $httpProvider) {
        $routeProvider
            //public pages
            .when('/', {
                templateUrl: 'views/home/home.view.client.html',
            })
            .when('/resources', {
                templateUrl: 'views/resources/resources.view.client.html',
            })
            .when('/about', {
                templateUrl: 'views/about/about.view.client.html',
            })
            .when('/contact_us', {
                templateUrl: 'views/contact/contact.view.client.html',
            })
            //login
            .when('/login', {
                templateUrl: 'views/login/login.view.client.html',
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/api_return/:tokenstring", {
                templateUrl: "views/redirect/redirect.view.client.html",
                controller: "RedirectController",
                controllerAs: "model"
            })
            //user actions after login
            .when('/user/:uid/', {
                templateUrl: 'views/user/dashboard.view.client.html',
            })
            .when('/user/:uid/account_setting', {
                templateUrl: 'views/user/account_setting.view.client.html',
            })
            .when('/user/:uid/contacts_activity', {
                templateUrl: 'views/user/contacts_activity.view.client.html',
            })
            .when('/user/:uid/send_invite', {
                templateUrl: 'views/user/send_invite.view.client.html',
            })
            //error
            .when('/404', {
                templateUrl: 'views/error/404.view.client.html',
            })
            .otherwise({
                redirectTo: '/404'
            });

        $httpProvider.interceptors.push(authInterceptor);

        function authInterceptor( Auth, $window) {
            return {
                // automatically attach Authorization header
                request: function(config) {
                    var token = Auth.getToken();
                    if(token) {
                        config.headers.Authorization =  token;
                    }
                    return config;
                },

                // If a token was sent back, save it
                response: function(res) {
                    if(res.data.token) {
                        Auth.saveToken(res.data.token);
                    }

                    return res;
                },

                responseError: function(res){
                    if(res.status === 401) {
                        $window.location = "#/login";
                    }
                }
            }
        }
    }



    function languageConfig(gettextCatalog, $window) {
        var DEFAULT_VALUE, PREFERRED_LANGUAGE, res;
        gettextCatalog.debug = true;
        DEFAULT_VALUE = 'en';
        PREFERRED_LANGUAGE = $window.navigator.language || $window.navigator.userLanguage || $window.navigator.browserLanguage || $window.navigator.systemLanguage || DEFAULT_VALUE;
        res = PREFERRED_LANGUAGE.split("-");
        gettextCatalog.setCurrentLanguage(res[0]);
    }

    function restrict ($rootScope, $location, Auth) {
        $rootScope.$on( "$routeChangeStart", function(event, next) {
            if (!Auth.isAuthed()) {
                if ( next.templateUrl && next.templateUrl.indexOf("views/user/") > -1) {
                    $location.path("/login");
                }
            }else {
                var uid = Auth.getUserId();
                if ( next.templateUrl === "views/login/login.view.client.html") {
                    $location.path("/user/" + uid);
                }
            }
        });
    }

})();