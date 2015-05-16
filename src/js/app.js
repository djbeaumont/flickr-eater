(function () {
	/* global angular */
	var app = angular.module('flickrEater', []);
	
	app.constant('appConfig', {
		flickrApi: {
			baseUrl: "https://api.flickr.com/services/feeds/photos_public.gne?format=json"
		}
	});
}());
