//The Venue class handles the data structure for venues

var venueImages = {
    lookups: [
        { name: "ebay", file: "ebay.png" },
        { name: "target", file: "target.png" },
        { name: "walmart", file: "walmart.png" },
        { name: "amazon", file: "amazon.png" },
        { name: "costco", file: "costco.png" },
        { name: "ralphs", file: "ralphs.png" },
        { name: "starbucks", file: "starbucks.png" },
        { name: "traderjoes", file: "trader-joes.png" },
        { name: "xbox", file: "xbox.png" }
    ],
    forName: function (name) {
        var sanitized = name.toLowerCase().replace(/\W/g, '');
        var found = _.find(venueImages.lookups, function (item) { return sanitized.indexOf(item.name) > -1; });
        if (typeof found != "undefined") {
            return found.file;
        }
        return "";
    }
};


var Venue = Backbone.Model.extend({
    defaults: {
        id: null,
        name: null,
        weeksRaw: null,
        weeks: {},
        target: null,
        account: null,
    },

    initialize: function () {

        var raw = this.get('weeksRaw');

        var weekArray = _.map(raw, function (item) {
            return new Week(item);
        });

        this.set('weeks', new WeekCollection(weekArray));

        this.set('imgName', venueImages.forName(this.get("name")));
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

    toRowJSON: function () {
        var weeks = this.getViewWeeks();
        return {
            name: this.get('name'),
            nameClass: this.get('imgName').length > 0 ? 'hasImg' : 'noImg',
            target: this.get('target'),
            pastWeek: weeks[2].toRowJSON(),
            thisWeek: weeks[1].toRowJSON(),
            nextWeek: weeks[0].toRowJSON(),
            img_url: "/images/venues/" + this.get('imgName')
        };
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

    // get past, this, next week
    getViewWeeks: function () {
        this.ensureWeeksExist();
        var weeks = this.get('weeks');
        return weeks.first(3);
    },

    ensureWeeksExist: function () {
        var weeks = this.get('weeks');

        if (weeks.size() < 1) { weeks.unshift(new Week({ target: this.get('target') })) }
        if (weeks.size() < 2) { weeks.unshift(new Week({ target: this.get('target') })) }
        if (weeks.size() < 3) { weeks.unshift(new Week({ target: this.get('target') })) }
    },

    getThisWeek: function () {
        return this.get('weeks').first(2)[1];
    },

    getLastWeek: function () {
        return this.get('weeks').first(3)[2];
    },

    getNextWeek: function () {
        return this.get('weeks').first(1)[0];
    },

    updateThisWeekTarget: function () {
        var thisWeek = this.getThisWeek();
        thisWeek.set("target", this.get("target"));
    },

    setLastWeekSpent: function (amount) {
        this.ensureWeeksExist();
        var lastWeek = this.getLastWeek();
        lastWeek.get('transactions').unshift({
            name: "Starting Point",
            spent: amount,
            date: new Date().getTime() - (60 * 60 * 24 * 7 * 1000)
        })
    },
    getAmountLeftThisWeek: function () {
        return this.getThisWeek().getDelta();
    }

    

    //pastWeek: function () {
    //    var editableWeekStack; //Copy of the week collection so that the first record can be removed (without harming the actual data)
    //    var previousWeek;

    //    editableWeekStack = this.get('weeks');
    //    editableWeekStack.pop();
    //    previousWeek = editableWeekStack.last();
    //    //previousWeek.set('name', 'Past Week');

    //    return previousWeek;
    //},

    //thisWeek: function () {
    //    var currentWeek = this.get('weeks').first();
    //    if (currentWeek == null) {
    //        this.get('weeks').add({
    //            target: this.get('target'),
    //            spent: 0,
    //            date: Date.now()
    //        });
    //        currentWeek = this.get('weeks').first();
    //    }
    //    //currentWeek.set('name', 'This Week');

        
        
    //    return currentWeek;
    //},

    //nextWeek: function () {
    //    var futureWeek;

    //    futureWeek = new Week({
    //        target: this.get('target'),
    //        spent: 0,
    //        date: Date.now()
    //    });
        
    //    return futureWeek;
    //}


});

var VenueCollection = Backbone.Collection.extend({
    model: Venue
});