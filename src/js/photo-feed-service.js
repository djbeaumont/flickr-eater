(function () {
    /* global angular */
    var app = angular.module('flickrEater');

    app.factory('PhotoFeedService', function (_, $http, appConfig) {
        var baseUrl = appConfig.flickr.apiUrl;

        var mapFlickrItem = function (item) {
            var tags = (item.tags || "").split(' ');
            var authorHomepage = appConfig.flickr.authorUrl.replace("{id}", item.author_id);

            return {
                title: item.title,
                thumbnailUrl: item.media.m,
                author: {
                    name: item.author,
                    homepage: authorHomepage
                },
                tags: tags
            };
        };

        return {
            getPhotos: function (tags) {
                var params = {
                    "jsoncallback": "JSON_CALLBACK",
                    "tags": tags.join(),
                    "media": "photos",
                    "orientation": "square"
                };
                return $http.jsonp(baseUrl, { params: params }).then(function (response) {
                    return _.map(response.data.items, mapFlickrItem);
                });
            }
        };
    });
}());
