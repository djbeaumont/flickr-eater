(function () {
    /* global angular */
    var app = angular.module('flickrEater');

    app.factory('PhotoFeedService', function (_, $http, appConfig) {
        var baseUrl = appConfig.flickr.apiUrl;
        var authorUrl = appConfig.flickr.authorUrl;
        var tagUrl = appConfig.flickr.tagUrl;
        var missingTitle = appConfig.ui.missingTitle;

        /**
         * Flickr gives back author names as a string like: "nobody@flickr.com (friendlyName)"
         * Presumably, more information like real contact addresses is given out if you have
         * an API key. For now we'll look for something email-address-like and retrieve the
         * friendly name.
         */
        var formatAuthorName = function (originalName) {
            var author = originalName;

            var authorRegex = /^.*@.*\s\((.*)\)$/g;
            var matches = authorRegex.exec(originalName);

            if (matches == null || matches.length != 2) {
                throw new Error("Could not find author name in: " + originalName)
            } else {
                author = matches[1];
            }

            return author;
        };

        /**
         * Apply some pretend business rules to photo titles.
         */
        var formatTitle = function (originalTitle) {
            var title = originalTitle;

            // Some authors like to put their titles in quotes and this
            // looks a bit weird in context with other photos.
            if (title.substring(0, 1) === '"' && title.substring(title.length - 1) === '"') {
                title = title.substring(1).substring(0, title.length - 2);
            }

            if (title.trim() === '') {
                title = missingTitle;
            }

            return title;
        };

        /**
         * Generate a fully qualified link based on the photo author's Flickr ID.
         */
        var generateAuthorLink = function (authorId) {
            return authorUrl.replace("{id}", authorId);
        };

        /**
         * Augment a tag with a link to the associated photos on Flickr.
         */
        var mapTag = function (name) {
            return {
                name: name,
                pageUrl: tagUrl.replace("{tag}", name)
            };
        };

        /**
         * Convert an item from Flickr's API into an expected format.
         */
        var mapFlickrItem = function (item) {
            var tags = _.map((item.tags || "").split(" "), mapTag);

            return {
                title: formatTitle(item.title),
                thumbnailUrl: item.media.m,
                pageUrl: item.link,
                author: {
                    name: formatAuthorName(item.author),
                    homepage: generateAuthorLink(item.author_id)
                },
                tags: tags
            };
        };

        return {
            /**
             * Retrieve photos from Flickr's public API.
             * @param tags Which tags to search Flickr for images.
             * @returns A promise that is resolved when the underlying HTTP response returns.
             */
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
