var dataCommands =
    {
        accountNodeName: 'account_',

        //loads all of the account data
        load: function (id, callback) {
            localDiskStorage.load(dataCommands.accountNodeName + id, function (data) {
                callback(data);
            });
        },

        //saves the data to the account node
        save: function (data, callback) {
            localDiskStorage.save(data, dataCommands.accountNodeName + data.id, function () {
                callback();
            });
        },

        //Inserts a new account in the account list
        createAccount: function (id, name, callback) {
            var data = { id: id, name: name };
            dataCommands.save(data, callback);
        }

    };
