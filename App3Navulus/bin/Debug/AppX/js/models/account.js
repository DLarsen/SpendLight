//The Account class handles the CRUD for accounts
//since accounts are the root of the data model tree, all CRUD is handled by this class

var Account = Backbone.Model.extend({
    defaults: {
        id: null,
        name: null,
        venuesRaw: {},
        venues: {},
        totalRedeemed: 0,
    },

    load: function () { debugger },

    initialize: function () {

        this.processRaw();

    },

    //fetch: function () {

    //    if (!this.has("id")) { throw "can't fetch unless we have an id"; }

    //    var that = this;
    //    dataCommands.load(this.get("id"), function (data) {

    //        this.constructor.__super__.fetch.apply(this, data);
    //        that.processRaw();

    //    });
        
    //},

    processRaw: function () {
        var raw = this.get('venuesRaw');

        var accountRef = this;
        var venueArray = _.map(raw, function (item) {
            // add parent ref
            item.account = accountRef;
            return new Venue(item);
        });

        this.set('venues', new VenueCollection(venueArray));
        this.trigger('loaded');
    },

    getSavings: function () {
        var savings = this.get('venues').map(function (item) {
            return item.getSavings();
        });
        var totalSaved = 0;

        _.each(savings, function (item) {
            totalSaved += item;
        });

        return totalSaved;
    },

    getTotalAvailable: function () {
        var totalSaved = this.getSavings();

        return (totalSaved - this.get('totalRedeemed'));
    },

    createVenue: function (name, target, imgName) {
        var accountRef = this;
        var venues = this.get('venues');
        venues.add({
            name: name,
            target: target,
            imgName: imgName,
            account: accountRef
        });
        return venues.last();
    },

    saveAccount: function (callback) {
        var that = this;
        var d = this.toJSON();
        dataCommands.save(d, function () {
            that.trigger('saved');
            that.sendLiveTile();
            if (typeof callback != "undefined") callback();
        });
    },

    sendLiveTile: function () {
        var amountLeftThisWeek = this.getAmountLeftThisWeek();
        var squareTitle = "$" + amountLeftThisWeek,
            squareSummary = "left this week";

        Tiles.sendTileUpdate(squareTitle, squareSummary);
    },

    toJSON: function () {
        var ret = {
            id: this.get('id'),
            name: this.get('name'),
            venuesRaw: this.get('venues').toJSON(),
            totalRedeemed: this.get('totalRedeemed')
        };
        return ret;
    },

    getWideTileLines: function () {

    },

    getAmountLeftThisWeek: function () {
        var venues = this.get('venues');
        var deltas = venues.map(function (item) { return item.getAmountLeftThisWeek(); });
        return _.reduce(deltas, function (x, y) { return x + y; }, 0);
    }

});

var AccountCollection = Backbone.Collection.extend({
    model: Account
});

//(function () {
//    "use strict";

//    // constructor function
//    function initShape(data) {
//        if (data) {
//            this.loadAccountData(data);
//        }
//    }

//    var instanceMembers = {
//        id: null,
//        name: null,
//        venues: {},
//        totalRedeemed: null,
//        fireBaseId: null,

//        totalSavings: function () {
//            //return total savings
//        },

//        totalAvailable: function () {
//            return this.totalSavings() - this.totalRedeemed;
//        },

//        loadAccountData: function (data) {
//            _.each(data, function (item) {
//                this.loadVenueData(item);
//            });
//            this.name = data.name;
//            this.id = data.id;
//        },

//        loadVenueData: function(data) {
//            // load the venuew data
//            var newVenue = new Classes.Venue(data);
//            if (this.venues.item) {
//                this.venues.item.push(newVenue);
//            }
//            else {
//                this.venues = newVenue
//            }
//        },

//        createVenue: function (name, target) {
//            var newVenue = new Classes.Venue();

//            newVenue.name = name;
//            newVenue.target = target;
//            if (this.venues.items) {
//                this.venues.items.push(newVenue);
//            }
//            else {
//                this.venues = newVenue;
//            }
//        },

//        saveAccount: function (callback) {
//            dataCommands.save(this, callback);
//        }

//    };

//    var staticMembers = {
//    };

//    var Account = WinJS.Class.define(initShape, instanceMembers, staticMembers);

//    // add to namespace
//    WinJS.Namespace.define("Classes", {
//        Account: Account
//    });

//})();

////var s = new Acme.Shapes.Shape();
////s.draw();