(function () {
	/* global angular */
	var app = angular.module('flickrEater');
	
	app.factory('PhotoFeedService', function ($http, appConfig) {
		var baseUrl = appConfig.flickrApi.baseUrl;
		
		return {
			getPhotos: function (tags) {
			    var params = {
			        "jsoncallback": "JSON_CALLBACK",
			        "tags": tags.join(),
			        "media": "photos",
			        "orientation": "square"
			    };
			    return $http.jsonp(baseUrl, { params: params });
			}
		};
	});
}());
