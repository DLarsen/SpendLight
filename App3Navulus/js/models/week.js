var Week = Backbone.Model.extend({
    defaults: {
        id: null,
        date: null,
        transactionsRaw: null,
        transactions: {},
        target: 0,
    },

    initialize: function () {
        var raw = this.get('transactionsRaw');

        var transactionArray = _.map(raw, function (item) {
            var t = new Transaction(item);
            return t;
        });

        var tc = new TransactionCollection(transactionArray);
        this.set('transactions', tc);
        this.listenTo(tc, 'add', this.bubbleTransactions);
    },

    toJSON: function () {
        var ret = {
            id: this.get('id'),
            transactionsRaw: this.get('transactions').toJSON(),
            target: this.get('target'),
            date: this.get('date')
        };
        console.log(JSON.stringify(this.get('transactions').toJSON()));
        return ret;
    },

    toRowJSON: function () {
        var spent = this.getSpent();
        var delta = this.get('target') - spent;
        var target = this.get("target");
        var pct = (target != 0 ? spent / target : 0) * 100;
        return {
            deltaLabel: delta < 0 ? ("$" + Math.abs(delta) + " OVER") : ("$" + Math.abs(delta) + " LEFT"),
            spent: spent,
            delta: delta,
            pct: pct
        };
    },

    getDelta: function() { return this.get('target') - this.getSpent();},

    bubbleTransactions: function () {
        this.trigger("trans-update");
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

    getSavings: function () {
        var spent = this.getSpent();
        return (this.get('target') - spent);
    },

    getAmounts: function () {
        var spent = this.getSpent();
        var target = this.get("target");
        return {
            pct: (target != 0 ? spent / target : 0) * 100,
            spent: spent,
            delta: target - spent
        };
    }

});

var WeekCollection = Backbone.Collection.extend({
    model: Week
});