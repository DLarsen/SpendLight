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

    initialize: function () {
        var raw = this.get('venuesRaw');

        var venueArray = _.map(raw, function (item) {
            return new Venue(item);
        });

        this.set('venues', new VenueCollection(venueArray));
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

            createVenue: function (name, target) {
                this.get('venues').add({
                    name: name,
                    target: target
                });
            },

            saveAccount: function () {
                var that = this;
                dataCommands.save(this.toJSON(), function () {
                    that.trigger('saved');
                });
            },

            toJSON: function () {
                var ret = {
                    id: this.get('id'),
                    name: this.get('name'),
                    venuesRaw: this.get('venues').toJSON(),
                    totalRedeemed: this.get('totalRedeemed')
                };
                return ret;
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