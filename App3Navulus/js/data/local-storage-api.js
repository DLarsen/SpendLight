var localDiskStorage =
    {
        baseFileName: 'data_',
        baseFileExtension: '.dat',
        localFolder: Windows.Storage.ApplicationData.current.localFolder,


        getFileName: function (node) {
            return localDiskStorage.baseFileName + node + localDiskStorage.baseFileExtension;
        },

        //Saves the data to the local disk
        //Overwrites the file of the same name if it exists
        save: function (data, node, callback) {
            var fileName = localDiskStorage.getFileName(node);
            var fileText = JSON.stringify(data);

            localDiskStorage.localFolder.createFileAsync(fileName, Windows.Storage.CreationCollisionOption.replaceExisting)
            .then(function (saveFile) {
                return Windows.Storage.FileIO.writeTextAsync(saveFile, fileText);
            }).done(function () {
                callback();
            },
            function (err) {
                localDiskStorage.errorEvent(err);
            });
        },

        //Loads data from local disk
        //If file not found, return NULL
        load: function (node, callback) {
            var fileName = localDiskStorage.getFileName(node);

            localDiskStorage.localFolder.getFileAsync(fileName)
            .then(function (saveFile) {
                return Windows.Storage.FileIO.readTextAsync(saveFile);
            }).done(function (data) {
                var jsonData = JSON.parse(data);
                callback(jsonData);
            }, function (err) {
                callback(null);
            });
        },

        //Event that fires when the API has an error
        errorEvent: function (err) {
            var md = new Windows.UI.Popups.MessageDialog(err);
            md.showAsync();
        }

    };