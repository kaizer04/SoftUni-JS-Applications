var app = app || {};

app.dataPersister = (function () {
    function Persister(rootUrl) {
        this.rootUrl = rootUrl;
        this.books = new Books(rootUrl);
    }

    var Books = (function () {
        function Books(rootUrl) {
            this.serviceUrl = rootUrl + 'Book/';
        }

        Books.prototype.getAll = function (success, error) {
            return ajaxRequester.get(this.serviceUrl, success, error);
        }

        Books.prototype.add = function (book, success, error) {
            return ajaxRequester.post(this.serviceUrl, book, success, error);
        }

        Books.prototype.delete = function (objectId, success, error) {
            return ajaxRequester.delete(this.serviceUrl + objectId, success, error);
        }

        return Books;
    }());

    return {
        get: function (rootUrl) {
            return new Persister(rootUrl);
        }
    }
}());