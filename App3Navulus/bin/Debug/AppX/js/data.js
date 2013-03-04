var Meal = Backbone.Model.extend({

    updateThing: function (thing) { this.set("asdf", thing); }

});

var m = new Meal({ dessert: 'cake' });

(function () {
    "use strict";

    var week = {target: 160, actual: 133};

    var venues = [
        { title: "Amazon.com",   target:  20, pastWeek: week, currentWeek: week, futureWeek: week , img_url: "/images/venues/amazon.png"},
        { title: "Trader Joe's", target: 160, pastWeek: week, currentWeek: week, futureWeek: week, img_url: "/images/venues/trader-joes.png" },
        { title: "Starbucks", target: 14, pastWeek: week, currentWeek: week, futureWeek: week, img_url: "/images/venues/starbucks.png" },
    ];

    var venueList = new WinJS.Binding.List(venues);




    // Create a namespace to make the data publicly
    // accessible. 
    var publicMembers =
        {
            venueList: venueList,
            myClickHandler: function (e) { console.log("Click!") },
            meal: m
        };
    WinJS.Namespace.define("DataExample", publicMembers);

})();