//The Venue class handles the data structure for venues

var Transaction = Backbone.Model.extend({
    defaults: {
        id: null,
        name: null,
        spent: 0,
        date: null,
    },

    initialize: function () {
    },

    toJSON: function () {
        var ret = {
            id: this.get('id'),
            name: this.get('name'),
            spent: this.get('spent'),
            date: this.get('date')
        };
        return ret;
    }

});

var TransactionCollection = Backbone.Collection.extend({
    model: Transaction
});

//(function () {
//    "use strict";

//    // constructor function
//    function initShape(data) {
//        if (data) {
//            this.loadVenueData(data);
//        }
//    }

//    var instanceMembers = {
//        id: null,
//        name: null,
//        weeks: {},
//        target: null,

//        totalSavings: function () {
//            //return total savings of all weeks
//        },

//        loadVenueData: function (data) {
//            _.forEach(data.venue, function (item) {
//                this.loadWeekData(item);
//            });
//            this.name = data.name;
//            this.target = data.target;
//            this.id = data.id;
//        },

//        loadWeekData: function (data) {
//            // load the venuew data
//            week.item.push(data);
//        }
//    };

//    var staticMembers = {
//    };

//    var Venue = WinJS.Class.define(initShape, instanceMembers, staticMembers);

//    // add to namespace
//    WinJS.Namespace.define("Classes", {
//        Venue: Venue
//    });

//})();

////var s = new Acme.Shapes.Shape();
////s.draw();