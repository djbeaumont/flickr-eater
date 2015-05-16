(function () {
	/* global angular */
	var app = angular.module('flickrEater');
	
	app.controller('PhotoFeedCtrl', function ($scope, $http, appConfig, PhotoFeedService) {
		var tags = [ 'lolcat' ];
		PhotoFeedService.getPhotos(tags).success(function (data) {
			$scope.items = data.items;
		});
	});
}());