//The Account class handles the CRUD for accounts
//since accounts are the root of the data model tree, all CRUD is handled by this class

var Account = Backbone.Model.extend({
    defaults: {
                id: null,
                name: null,
                venuesRaw: {}, // The venue JSON data that is returned from FireBase
                venues: {}, // The VenueCollection model
                totalRedeemed: 0,
                reward: null // The Reward model
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

            getTotalCurrentWeekValue: function() {
                //needs to be built
                return 0;
            },

            getTotalAvailable: function () {
                var totalSaved = this.getSavings();
                var totalRedeemed = this.get('totalRedeemed');
                var totalCurrentWeekValue = this.getTotalCurrentWeekValue();// The total value of current weeks should be removed because they haven't been "saved" yet.

                return ((totalSaved - totalCurrentWeekValue)- totalRedeemed);
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
                    totalRedeemed: this.get('totalRedeemed'),
                    reward: this.get('reward')
                };
                return ret;
            },

            // Return boolean indicating if there is sufficient funds saved up to buy the reward.
            canRewardBeRedeemed: function() {
                return (this.get('reward').get('cost') <= this.getTotalAvailable());
            },

            redeemReward: function () {
                var currentReward = this.get('reward');
                var currentCost = currentReward.cost;
                this.set('totalRedeemed', currentCost + this.get('totalRedeemed'));
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