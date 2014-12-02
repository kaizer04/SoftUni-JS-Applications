var ajaxRequester = (function () {
    var makeRequest = function makeRequest(method, url, data, success, error) {
        return $.ajax({
            type: method,
            url: url,
            contentType: 'application/json',
            headers: {
                "X-Parse-Application-Id": "fWyfj6ec5GGvkscJzbaroHp2dLyMvDzjmiYeFPUe",
                "X-Parse-REST-API-Key": "4YREaGhia9JuYO1WyOSq7Byz5JTsexzfGDOmiDZa"
            },
            data: JSON.stringify(data),
            success: success,
            error: error
        })
    }

    function makeGetRequest(url, success, error) {
        return makeRequest('GET', url, null, success, error);
    }

    function makePostRequest(url, data, success, error) {
        return makeRequest('POST', url, data, success, error);
    }

    function makePutRequest(url, data, success, error) {
        return makeRequest('PUT', url, data, success, error);
    }

    function makeDeleteRequest(url, success, error) {
        return makeRequest('DELETE', url, {}, success, error);
    }

    return {
        get: makeGetRequest,
        post: makePostRequest,
        put: makePutRequest,
        delete: makeDeleteRequest
    }
}());