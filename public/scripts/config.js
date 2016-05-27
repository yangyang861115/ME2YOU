/**
 * Created by yangyang on 5/27/16.
 */
(function () {
    'use strict';

    angular
        .module('escomm')
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when('/home', {
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
            .when('/404', {
                templateUrl: 'views/error/404.view.client.html',
            })
            .otherwise({
                redirectTo: '/404'
            });
    }
})();