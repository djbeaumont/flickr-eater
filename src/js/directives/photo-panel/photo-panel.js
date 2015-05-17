(function () {
    /* global angular */
    var app = angular.module('flickrEater');

    app.directive('photoPanel', function () {
        return {
            restrict: 'E',
            templateUrl: 'js/directives/photo-panel/photo-panel.html',
            scope: {
                photo: '=photo'
            }
        };
    });
}());
