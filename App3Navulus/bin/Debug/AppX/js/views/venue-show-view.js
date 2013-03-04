var VenueView = Backbone.View.extend({

    initialize: function () {
        this.setElement($("#venue-item-view"));
        this.render();
    },

    className: "box-box-row",

    events: {
        "click .venue": "clickVenue",
    },

    render: function () {
        
        var modelJSON = this.model.toRowJSON();
        this.$el.html(templates.venueListItemTemplate(modelJSON));

        // render the children
        var lw = new VVWeekItemView({ model: this.model.getLastWeek() });
        var tw = new VVWeekItemView({ model: this.model.getThisWeek() });
        var nw = new VVWeekItemView({ model: this.model.getNextWeek() });

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

});

var VVWeekItemView = Backbone.View.extend({

    className: "week",

    initialize: function () {
        this.listenTo(this.model, "change", this.render);
        this.listenTo(this.model, "trans-update", this.updateValueDisplay);
    },

    render: function () {

        var modelJSON = this.model.toRowJSON();
        var markup = templates.weekTemplate(modelJSON);

        var deltaClass = modelJSON.delta < 0 ? "delta-over" : "delta-under";

        this.$el.html(markup).find('.delta').addClass(deltaClass);
        return this;
    },

    setSpent: function (spent) {
        this.$el.find('.spent-amount').html(spent);
    },

    setPct: function (pct) {
        this.$el.find('.across').css("width", pct + "%");
    },

    setDelta: function (delta, pct) {
        this.$el.find('.delta-label').html(delta < 0 ? ("$" + Math.abs(delta) + " OVER") : ("$" + Math.abs(delta) + " LEFT"));
        if (delta >= 0) {
            pct = Math.min(100, pct);
            this.$el.find('.across').css("width", pct + "%");
            this.$el.find('.delta').addClass("delta-under").removeClass('delta-over');
        } else {
            this.$el.find('.delta').addClass("delta-over").removeClass('delta-under');
        }
    },

    updateValueDisplay: function () {
        var amounts = this.model.getAmounts();
        this.setSpent(amounts.spent);
        this.setDelta(amounts.delta, amounts.pct);
    },

    setRndPct: function () {
        this.setPct(Math.floor(Math.random() * 100));
    }

});

// model: TransactionCollection
var TransListView = Backbone.View.extend({
    initialize: function () {
        this.setElement($("#trans-list-view"));
        this.listenTo(this.model, "add-full", this.render);
    },
    events: {
        "click .btnSaveGood": "onAddGoodTransaction",
        "click .btnSaveBad": "onAddBadTransaction",
    },

    render: function () {
        this.$el.find('.trans-list').empty();
        var that = this;
        this.model.forEach(function (item) {
            that.onAddItem(item);
        });
    },

    onAddItem: function (item) {
        var modelJSON = item.toViewJSON();
        var html = templates.transListItemTemplate(modelJSON);
        this.$el.find('.trans-list').append(html);
    },

    onAddGoodTransaction: function () {
        this.onAddTransaction("good");
    },

    onAddBadTransaction: function () {
        this.onAddTransaction("bad");
    },

    onAddTransaction: function (goodbad) {
        var rawAmount = $("#amount").val().trim();
        var amount = Math.ceil(rawAmount);
        $("#amount").val("");
        if (isNaN(parseInt(rawAmount))) return;
        this.model.unshift({
            name: name,
            spent: amount,
            date: new Date().getTime(),
            isGood: goodbad == "good"
        });
        var t = this.model.first();
        var comments = $("#comments").val().trim();
        $("#comments").val("");
        var prefix = goodbad == "good" ? "<b>Good Job!</b><br />" : "<b>Stick with the plan next time.</b><br />";
        t.addComment(prefix + comments, 1);
        t.trigger('add-full'); // this is done because our original trigger re-rendered the list before the comment was added
        world.currentAccount.saveAccount();
    }
});