var dataCommands =
    {
        accountNodeName: 'account_',
        venueNodeName: 'account/venue',


        //loads all of the account data
        load: function (id, callback) {
            fireBaseAPI.load(dataCommands.accountNodeName + id, function (data) {
                callback(data);
            });
        },

        //saves the data to the account node
        save: function (data, callback) {
            fireBaseAPI.save(data, dataCommands.accountNodeName + data.id, function () {
                callback();
            });
        },

        //Inserts a new account in the account list
        createAccount: function (id, name, callback) {
            //dataCommands.getNextId(dataCommands.accountNodeName, function (newId) {
            var data = { id: id, name: name };
            dataCommands.save(data, callback);
            //fireBaseAPI.insert(data, dataCommands.accountNodeName, function (fireBaseId) {
            //    callback(fireBaseId);
            //});
        },


        ////Inserts a new account in the account list
        //createAccount: function(name, callback){
        //    dataCommands.getNextId(dataCommands.accountNodeName, function (newId) {
        //        var data = { id: newId, name: name };

        //        fireBaseAPI.insert(data, dataCommands.accountNodeName, function (fireBaseId) {
        //            callback(fireBaseId);
        //        });
        //    });
        //},

        ////Inserts a new venue on an account
        //createVenue: function (accountId, venueName, venueTarget, callback) {
        //    var currentNode = dataCommands.venueNodeName;

        //    dataCommands.getNextId(currentNode, function (newId) {
        //        var data = { id: newId, name: venueName, target: venueTarget };

        //        fireBaseAPI.insert(data, currentNode, function () {
        //            callback();
        //        });
        //    });
        //},

        //Determines the next available ID (used to auto-increments the ID when creating a new record)
        getNextId: function (node, callback) {
            fireBaseAPI.load(node, function (data) {
                var maxId = 0;

                _.forEach(data, function (item) {
                    if (maxId < item.id) {
                        maxId = item.id;
                    }
                });
                maxId += 1
                callback(maxId);
            });
        }
    };
