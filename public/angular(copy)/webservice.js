/**
 * Created by yangyang on 5/26/16.
 */
'use strict';
var WebService;

WebService = (function() {
    function WebService($http1) {
        this.$http = $http1;
        this.baseUrl = "/api/v1/";
    }

    WebService.prototype.getGreeting = function() {
        return this.$http.get(this.baseUrl + "greet");
    };

    return WebService;

})();

angular.module("escomm.WebService", [], function($provide) {
    return $provide.factory("webService", [
        "$http", function($http) {
            return new WebService($http);
        }
    ]);
});
