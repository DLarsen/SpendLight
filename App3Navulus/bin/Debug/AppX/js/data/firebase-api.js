var fireBaseAPI =
    {
        //url: 'https://jesse-poc.firebaseio.com/',
        url: 'https://launch-wifi-is-aweseome.firebaseio.com/',

        //Saves the data to FireBase
        save: function (data, node, callback) {
            WinJS.xhr({ url: fireBaseAPI.createUrl(node), type: 'PUT', data: JSON.stringify(data) }).then(function (data) {
                callback();
            },
            function (err) {
                fireBaseAPI.errorEvent(err);
            });
        },

        //Loads the data from FireBase
        load: function (node, callback) {
            WinJS.xhr({ url: fireBaseAPI.createUrl(node) }).then(function (data) {
                var jsonData = JSON.parse(data.response);
                callback(jsonData);
            },
            function (err) {
                fireBaseAPI.errorEvent(err);
            });
        },

        //Adds and item to a list
        insert: function (data, node, callback) {
            WinJS.xhr({ url: fireBaseAPI.createUrl(node), type: 'POST', data: JSON.stringify(data) }).then(function (data) {
                var jsonData = JSON.parse(data.response)
                callback(jsonData.name);
            },
            function (err) {
                fireBaseAPI.errorEvent(err);
            });
        },

        //Creates the url for interfacing with FireBaseAPI
        createUrl: function (node) {
            return fireBaseAPI.url + node + '.json';
        },

        //Event that fires when the API has an error
        errorEvent: function (err) {
            var jsonData = JSON.parse(err.response)
            document.getElementById('debug').innerHTML = jsonData.error;
        }

    };