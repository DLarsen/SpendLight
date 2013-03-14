var world = world || {};
world.availableAccounts = [
    { id: 1, name: "Me & the Wife" },
    { id: 2, name: "Grandma" },
    { id: 3, name: "Evelyn" },
];
world.currentAccountId = 1;
world.currentAccount = null;

var SpendlightAppView = Backbone.View.extend({
    className: "home-view",
    initialize: function () {
        this.setElement($("#home-view"));
        this.loadCurrentAccount();
        this.render();
    },

    render: function () {
        
    },

    renderLoading: function () {
        $("#venue-list").empty();
        $("#loading").show();
    },

    renderAccount: function () {
        $("#loading").hide();
        var venues = world.currentAccount.get('venues');
        if (venues.length == 0)
            $('#onboarding').show();
        else
            $('#onboarding').hide();
        var vlv = new VenueListView({ model: venues });
        vlv.render();
        $('.box-box-add').fadeIn();
    },

    loadCurrentAccount: function () {
        if (world.currentAccount != null) {
            this.renderAccount();
            return;
        }
        var that = this;
        $("#loading").show();
        $('#venue-list').empty();

        dataCommands.load(world.currentAccountId, function (data) {

            if (data == null) {

                world.currentAccount = new Account({ id: world.currentAccountId });

                //world.currentAccount.createVenue('Starbucks', 20, 'starbucks.png');
                //world.currentAccount.createVenue('Amazon', 15, 'amazon.png');
                //world.currentAccount.createVenue('Trader Joe\'s', 150, 'trader-joes.png');
            } else {
                world.currentAccount = new Account(data);
            }

            that.renderAccount();

        });

    },
    saveAll: function () {
        world.currentAccount.saveAccount();
    },
    swapAccounts: function (accountid) {
        world.currentAccountId = accountid;
        world.currentAccount = null;
        this.loadCurrentAccount();
    }

});

var VenueListView = Backbone.View.extend({

    initialize: function () {
        this.setElement($("#venue-list"));
    },

    render: function () {
        this.$el.empty();
        var that = this;
        this.model.forEach(function (item) {
            that.onAddItem(item);
        });
    },

    onAddItem: function( item ){
        var view = new VenueItemView({ model: item });
        var html = view.render().el;
        this.$el.append(html);
    },
});

var VenueItemView = Backbone.View.extend({

    className: "box-box-row",

    events: {
        "click .box-box-week": "clickWeek",
        "click .venue": "clickVenue",
    },

    render: function () {
        
        var modelJSON = this.model.toRowJSON();
        this.$el.html(templates.venueListItemTemplate(modelJSON));

        // render the children
        var lw = new WeekItemView({ model: this.model.getLastWeek() });
        var tw = new WeekItemView({ model: this.model.getThisWeek() });
        var nw = new WeekItemView({ model: this.model.getNextWeek() });

        this.$el.find('.pastWeek').append(lw.render().el);
        this.$el.find('.thisWeek').append(tw.render().el);
        this.$el.find('.nextWeek').append(nw.render().el);

        return this;
    },

    clickVenue: function (e) {

        console.log(this.model.get("name"));
        //document.getElementById('commandsAppBar').winControl.show();

        var location = "/pages/venue/edit.html";
        WinJS.Navigation.navigate(location, this.model);
    },

    clickWeek: function (e) {
        var location = "/pages/venue/show.html";
        WinJS.Navigation.navigate(location, this.model);
    }

});

var WeekItemView = Backbone.View.extend({

    className: "week",

    events: {
        "click": "onClick"
    },

    initialize: function () {
        this.listenTo(this.model, "change", this.render);
    },

    render: function () {

        var modelJSON = this.model.toRowJSON();
        var markup = templates.weekTemplate(modelJSON);

        var deltaClass = modelJSON.delta < 0 ? "delta-over" : "delta-under";

        this.$el.html(markup).find('.delta').addClass(deltaClass);
        return this;
    },

    onClick: function () {
        this.setRndPct();
    },

    setPct: function (pct) {
        this.$el.find('.across').css("width", pct + "%");
    },

    setRndPct: function () {
        this.setPct(Math.floor(Math.random() * 100));
    }


});