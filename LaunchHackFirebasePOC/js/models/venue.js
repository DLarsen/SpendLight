//The Venue class handles the data structure for venues

var Venue = Backbone.Model.extend({
    defaults: {
        id: null,
        name: null,
        weeksRaw: null,
        weeks: {},
        target: null,
    },

    initialize: function() {
        var raw = this.get('weeksRaw');

        var weekArray = _.map(raw, function (item) {
            return new Week(item);
        });

        this.set('weeks', new WeekCollection(weekArray));
    },

    toJSON: function () {
        var ret = {
            id: this.get('id'),
            name: this.get('name'),
            weeksRaw: this.get('weeks').toJSON(),
            target: this.get('target')
        };
        return ret;
    },

    createWeek: function (name, target, spent, date) {
        this.get('weeks').add({
            name: name,
            target: target,
            spent: spent,
            date: date
        });
    },

    getSavings: function () {
        var savings = this.get('weeks').map(function (item) {
            return item.getSavings();
        });
        var totalSaved = 0;

        _.each(savings, function (item) {
            totalSaved += item;
        });

        return totalSaved;
    },

    pastWeek: function () {
        var previousWeek;

        previousWeek = this.get('weeks').first();
        previousWeek.set('name', 'Past Week');

        return previousWeek;
    },

    thisWeek: function () {
        var currentWeek;

        currentWeek = this.get('weeks').last();
        currentWeek.set('name', 'This Week');
        
        return currentWeek;
    },

    nextWeek: function () {
        var futureWeek;

        futureWeek = new Week({
            name: 'Next Week',
            target: this.get('target'),
            spent: 0,
            date: Date.now()
        });
        
        return futureWeek;
    }


});

var VenueCollection = Backbone.Collection.extend({
    model: Venue
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