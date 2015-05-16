(function () {
	/* global angular */
	var app = angular.module('photoFeed', []);
	
	app.constant('appConfig', {
		flickrApi: {
			baseUrl: "https://api.flickr.com/services/feeds/photos_public.gne?format=json"
		}
	});
}());
