describe('PhotoFeedService test', function () {
    var service, http;

    var mockResponse = {
        "title": "Recent Uploads tagged cat",
        "link": "https://www.flickr.com/photos/tags/cat/",
        "description": "",
        "modified": "2015-05-17T21:51:22Z",
        "generator": "https://www.flickr.com/",
        "items": [
            {
                "title": "title",
                "link": "https://www.flickr.com/photos/99117316@N03/17766110376/",
                "media": {"m": "https://farm8.staticflickr.com/7742/17766110376_4a9a652534_m.jpg"},
                "date_taken": "2015-05-17T14:51:22-08:00",
                "description": "La la la",
                "published": "2015-05-17T21:51:22Z",
                "author": "nobody@flickr.com (rapidace)",
                "author_id": "99117316@N03",
                "tags": "cat"
            }
        ]
    };

    var mockPhoto = {
        title: "title",
        thumbnailUrl: "https://farm8.staticflickr.com/7742/17766110376_4a9a652534_m.jpg",
        pageUrl: "https://www.flickr.com/photos/99117316@N03/17766110376/",
        author: {
            name: "rapidace",
            homepage: "https://www.flickr.com/people/99117316@N03/"
        },
        tags: [{name: "cat", pageUrl: "https://www.flickr.com/search/?tags=cat"}]
    };

    beforeEach(module('flickrEater'));
    beforeEach(inject(function(PhotoFeedService, $httpBackend) {
        service = PhotoFeedService;
        http = $httpBackend;
    }));

    it("can be instantiated", function() {
        expect(service).not.toBeNull();
    });

    it("can retrieve photos", function (done) {
        var expectedUrl = "https://api.flickr.com/services/feeds/photos_public.gne?"
                        + "format=json&jsoncallback=JSON_CALLBACK&"
                        + "media=photos&orientation=square&tags=cat";
        var response = http.expectJSONP(expectedUrl).respond(200, mockResponse);

        var testPhotos = function(photos) {
            expect(photos[0]).toEqual(mockPhoto);
        };

        var failTest = function(error) {
            expect(error).toBeUndefined();
        };

        service.getPhotos(['cat'])
               .then(testPhotos)
               .catch(failTest)
               .finally(done);

        http.flush();
    });
});
