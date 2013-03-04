(function () {
    "use strict";

    function sendTileUpdate(squareTitle, squareSummary) {
        var wideTileXml,
            squareTileXml,
            combinedTileXml,
            tileNotification;

        if (squareTitle && squareSummary) {
            wideTileXml = buildWideTileXml(squareTitle, squareSummary);
            squareTileXml = buildSquareTileXml(squareTitle, squareSummary);
            combinedTileXml = combineTileXml(wideTileXml, squareTileXml);

            tileNotification = new Windows.UI.Notifications.TileNotification(combinedTileXml);
            Windows.UI.Notifications.TileUpdateManager.createTileUpdaterForApplication().update(tileNotification);
        }
    }

    function buildSquareTileXml(altitude, altitudeUnits) {
        var squareTemplate = Windows.UI.Notifications.TileTemplateType.tileSquareText02,
                squareTileLines = [
                    altitude,
                    altitudeUnits
                ],
                squareTileXml = Windows.UI.Notifications.TileUpdateManager.getTemplateContent(squareTemplate),
                squareTileTextAttributes = squareTileXml.getElementsByTagName("text");

        for (var i = 0; i < squareTileLines.length; i++) {
            squareTileTextAttributes[i].appendChild(squareTileXml.createTextNode(squareTileLines[i]));
        }

        var squareTileBinding = squareTileXml.getElementsByTagName("binding");
        if (squareTileBinding[0]) {
            squareTileBinding[0].setAttribute("branding", "name");
        }

        return squareTileXml;
    }

    function buildWideTileXml(altitude, altitudeUnits) {
        var wideTemplate = Windows.UI.Notifications.TileTemplateType.tileSquareBlock,
                wideTileLines = [
                    altitude,
                    altitudeUnits
                ],
                wideTileXml = Windows.UI.Notifications.TileUpdateManager.getTemplateContent(wideTemplate),
                wideTileTextAttributes = wideTileXml.getElementsByTagName("text");

        for (var i = 0; i < wideTileLines.length; i++) {
            wideTileTextAttributes[i].appendChild(wideTileXml.createTextNode(wideTileLines[i]));
        }

        var binding = wideTileXml.getElementsByTagName("binding");
        if (binding[0]) {
            binding[0].setAttribute("branding", "name");
        }

        return wideTileXml;
    }

    function combineTileXml(wideTileXml, squareTileXml) {
        var node = wideTileXml.importNode(squareTileXml.getElementsByTagName("binding").item(0), true);
        wideTileXml.getElementsByTagName("visual").item(0).appendChild(node);

        return wideTileXml;
    }

    WinJS.Namespace.define("Tiles", {
        sendTileUpdate: sendTileUpdate,
        buildWideTileXml: buildWideTileXml,
        buildSquareTileXml: buildSquareTileXml
    });
})();