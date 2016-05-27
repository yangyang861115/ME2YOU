/**
 * Created by yangyang on 5/26/16.
 */
angular.module('escomm').run(function(gettextCatalog, $window) {
    var DEFAULT_VALUE, PREFERRED_LANGUAGE, res;
    gettextCatalog.debug = true;
    DEFAULT_VALUE = 'en';
    PREFERRED_LANGUAGE = $window.navigator.language || $window.navigator.userLanguage || $window.navigator.browserLanguage || $window.navigator.systemLanguage || DEFAULT_VALUE;
    res = PREFERRED_LANGUAGE.split("-");
    gettextCatalog.setCurrentLanguage(res[0]);
    return gettextCatalog.debug = true;
}).run(function($log) {
    return 'ngInject';
});