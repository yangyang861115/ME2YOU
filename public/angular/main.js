/**
 * Created by yangyang on 5/26/16.
 */
'use strict';
var MainCtrl,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

MainCtrl = (function() {
    function MainCtrl($scope, webService) {
        this.$scope = $scope;
        this.webService = webService;
        this.error = bind(this.error, this);
        this.success = bind(this.success, this);
        this.setup();
    }

    MainCtrl.prototype.setup = function() {
        this.$scope.awesomeThings = ['HTML5 Boilerplate', 'AngularJS', 'Karma'];
        return this.$scope.formData = {
            firstName: '',
            lastName: '',
            emailAddress: '',
            emailLanguage: '',
            customMessage: ''
        };
    };

    MainCtrl.prototype.getData = function() {
        var promise;
        promise = this.webService.getGreeting();
        return promise.then(this.success, this.error);
    };

    MainCtrl.prototype.success = function(response) {
        return this.$scope.fname = response.data.fname;
    };

    MainCtrl.prototype.error = function(response) {
        return this.$scope.message = "Error!";
    };

    return MainCtrl;

})();

angular.module("escomm").controller("MainCtrl", MainCtrl);

MainCtrl.$inject = ["$scope", "webService"];