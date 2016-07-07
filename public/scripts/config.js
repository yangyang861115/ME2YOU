/**
 * Created by yangyang on 5/27/16.
 */
(function () {
    'use strict';

    angular
        .module('myApp')
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
                controller: "ContactController",
                controllerAs: "model"
            })
            //login
            .when('/login', {
                templateUrl: 'views/login/login.view.client.html',
                controller: "LoginController",
                controllerAs: "model"
            })
            .when('/signup', {
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
            .when('/user', {
                templateUrl: 'views/user/dashboard.view.client.html',
                resolve : {
                    loggedIn: checkLoggedIn
                }
            })
            .when('/user/account_setting', {
                templateUrl: 'views/user/account_setting.view.client.html',
                controller: "AccountController",
                controllerAs: "model",
                resolve : {
                    loggedIn: checkLoggedIn
                }
            })
            .when('/user/contacts_activity', {
                templateUrl: 'views/user/contacts_activity.view.client.html',
                controller: "ActivityController",
                controllerAs: "model",
                resolve : {
                    loggedIn: checkLoggedIn
                }
            })
            .when('/user/send_invite', {
                templateUrl: 'views/user/send_invite.view.client.html',
                controller: "ActivityController",
                controllerAs: "model",
                resolve : {
                    loggedIn: checkLoggedIn
                }
            })
            //error
            .when('/404', {
                templateUrl: 'views/error/404.view.client.html',
            })
            .otherwise({
                redirectTo: '/404'
            });


        function checkLoggedIn(Auth, User, $location, $q) {
            var deferred = $q.defer();
            var token = Auth.getToken();
            if (token) {
                User.validateToken()
                    .then(
                        function (response) {
                            if (response && response.data.success) {
                                deferred.resolve();
                            } else {
                                deferred.reject();
                                $location.url('/login');
                            }
                        },
                        function (err) {
                            deferred.reject();
                            $location.url('/login');
                        }
                    );
            } else {
                var cookieToken = Auth.getTokenFromCookie();
                if (cookieToken) {
                    Auth.saveToken(cookieToken, function () {
                        User.validateToken(cookieToken)
                            .then(function (response) {
                                if (response && response.data.success) {
                                    deferred.resolve();
                                }
                                else {
                                    $window.localStorage.removeItem('jwtToken');
                                    Auth.deleteRememberMeCookie();
                                    deferred.reject();
                                    $location.url('/login');
                                }
                            });
                    });
                } else {
                    deferred.reject();
                    $location.url('/login');
                }
            }
            return deferred.promise;
        }

        function checkAdmin(Auth, $location, $q) {
            var deferred = $q.defer();
            var admin = Auth.checkAdmin();
            if (admin) {
                deferred.resolve();
            } else {
                deferred.reject();
                $location.url('/user');
            }
            return deferred.promise;
        }

        $httpProvider.interceptors.push(authInterceptor);

        function authInterceptor(Auth, $window) {
            return {
                // automatically attach Authorization header
                request: function (config) {
                    var token = $window.sessionStorage['jwtToken'];
                    //console.log("the token in the header is ");
                    //console.log(token);
                    if (token) {
                        config.headers.Authorization = token;
                    }
                    return config;
                },

                // If a token was sent back, save it
                response: function (res) {
                    if (res.data.token) {
                        Auth.saveToken(res.data.token);
                    }

                    return res;
                },

                responseError: function (res) {
                    if (res.status === 401) {
                        $window.location = "#/login";
                    }
                }
            }


        }


    }

    function restrict($rootScope, $location, $window, Auth, User) {
        $rootScope.$on("$routeChangeStart", function (event, next) {
            if (!Auth.isAuthed()) {
                console.log("You don't have a token in session storage");
                if (next.templateUrl && next.templateUrl.indexOf("views/user/") > -1) {
                    $location.path("/login");
                } else if (next.templateUrl === "views/login/login.view.client.html") {
                    console.log("checking cookie..........");
                    checkLoginAgain();
                }
            } else {
                console.log("You  have a token in session storage");
                if (next.templateUrl === "views/login/login.view.client.html") {
                    $location.path("/user");
                }
            }

        });

        function checkLoginAgain() {
            var cookieState = Auth.validateRememberMeCookie();
            if (cookieState) {
                var token;
                console.log("this is a valid cookie");
                var cookielist = document.cookie.split(';');
                for (var i in cookielist) {
                    if (cookielist[i].indexOf('remember-me') != -1) {
                        //get the token from the cookie list
                        token = cookielist[i].split('=')[1];
                    }
                }

                Auth.saveToken(token, function () {
                    User.validateToken()
                        .then(function (response) {
                            if (response && response.data.success) {
                                console.log("login successfully by token in the cookie!");
                                window.location = "#/user";
                            }
                            else {
                                $window.localStorage.removeItem('jwtToken');
                                Auth.deleteRememberMeCookie();
                                window.location = "#/login";
                                console.log("The token in the cookie is invalid");
                            }
                        });
                });

            } else {
                console.log("no cookie found or the cookie has expired");
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


})();