(function () {
    /* global angular */
    var app = angular.module('flickrEater', []);

    app.constant('appConfig', {
        flickr: {
            apiUrl: "https://api.flickr.com/services/feeds/photos_public.gne?format=json",
            authorUrl: "https://www.flickr.com/people/{id}/"
        }
    });

    app.constant('_', window._);
}());
