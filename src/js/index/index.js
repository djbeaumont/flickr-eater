(function () {
    /* global angular */
    var app = angular.module('flickrEater');

    app.controller('PhotoFeedCtrl', function ($scope, $http, appConfig, PhotoFeedService) {
        var tags = [ 'cat' ];
        PhotoFeedService.getPhotos(tags).then(function (photos) {
            $scope.photos = photos;
        });
    });
}());
