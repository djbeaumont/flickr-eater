(function () {
    /* global angular */
    var app = angular.module('flickrEater');

    app.controller('PhotoFeedCtrl', function ($scope, $http, appConfig, PhotoFeedService) {
        var tags = [ 'cat' ];
        var vm = this;

        PhotoFeedService.getPhotos(tags).then(function (photos) {
            vm.loaded = true;
            vm.success = true;
            vm.photos = photos;
        }, function (error) {
            vm.loaded = true;
            vm.success = false;
        });
    });
}());
