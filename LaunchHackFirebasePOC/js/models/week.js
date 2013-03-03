//The Venue class handles the data structure for venues

var Week = Backbone.Model.extend({
    defaults: {
        id: null,
        name: null,
        date: null,
        transactionsRaw: null,
        transactions: {},
        target: null,
    },

    initialize: function () {
        var raw = this.get('transactionsRaw');

        var transactionArray = _.map(raw, function (item) {
            return new Transaction(item);
        });

        this.set('transactions', new TransactionCollection(transactionArray));
    },

    toJSON: function () {
        var ret = {
            id: this.get('id'),
            name: this.get('name'),
            transactionsRaw: this.get('transactions').toJSON(),
            target: this.get('target'),
            date: this.get('date')
        };
        return ret;
    },

    createTransaction: function (name, spent, date) {
        this.get('transactions').add({
            name: name,
            spent: spent,
            date: date
        });
    },

    getSpent: function () {
        var spending = this.get('transactions').pluck('spent');
        var totalSpending = 0;

        _.each(spending, function (item) {
            totalSpending += item;
        });

        return totalSpending;
    },

    getSavings: function() {
        var spent = this.getSpent();
        return (this.get('target') - spent);
    }

});

var WeekCollection = Backbone.Collection.extend({
    model: Week
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