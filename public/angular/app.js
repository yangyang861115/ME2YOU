/**
 * Created by yangyang on 5/26/16.
 */

'use strict';
angular.module('escomm').config(function($logProvider) {
    'ngInject';
    return $logProvider.debugEnabled(true);
});

angular.module('escomm').config(function($routeProvider) {
    'ngInject';
    return $routeProvider.when('/home', {
        templateUrl: 'views/main.view.client.html',
        controller: 'MainCtrl'
    }).when('/signed_in_home', {
        templateUrl: 'views/signed_in_home.html',
        controller: 'MainCtrl'
    }).when('/send_invite', {
        templateUrl: 'views/send_invite.html',
        controller: 'MainCtrl'
    }).when('/resources', {
        templateUrl: 'views/resources.html',
        controller: 'MainCtrl'
    }).when('/about', {
        templateUrl: 'views/about.html',
        controller: 'MainCtrl'
    }).when('/settings', {
        templateUrl: 'views/settings.html',
        controller: 'MainCtrl'
    }).when('/contact_us', {
        templateUrl: 'views/contact_us.html',
        controller: 'MainCtrl'
    }).when('/confirm_invite', {
        templateUrl: 'views/confirm_invite.html',
        controller: 'MainCtrl'
    }).when('/account_settings', {
        templateUrl: 'views/account_settings.html',
        controller: 'MainCtrl'
    }).when('/contacts_activity', {
        templateUrl: 'views/contacts_activity.html',
        controller: 'MainCtrl'
    }).when('/', {
        templateUrl: 'views/main.view.client.html',
        controller: 'MainCtrl'
    });
});