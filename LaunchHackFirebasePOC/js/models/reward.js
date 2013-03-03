//The Reward class handles the data structure for rewards

var Reward = Backbone.Model.extend({
    defaults: {
        id: null,
        name: null,
        cost: 0,
    },

    initialize: function () {
    },

    toJSON: function () {
        var ret = {
            id: this.get('id'),
            name: this.get('name'),
            cost: this.get('cost'),
        };
        return ret;
    }

});

var RewardCollection = Backbone.Collection.extend({
    model: Reward
});