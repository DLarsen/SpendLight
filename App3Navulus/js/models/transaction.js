//The Venue class handles the data structure for venues

var Transaction = Backbone.Model.extend({
    defaults: {
        id: null,
        name: null,
        spent: 0,
        date: null,
        commentsRaw: null,
        comments: null,
        isGood: false,
    },

    initialize: function () {
        var raw = this.get('commentsRaw');

        var a = _.map(raw, function (item) {
            return new Comment(item);
        });

        this.set('comments', new CommentCollection(a));
    },

    comments: function(){return this.get('comments');},

    toJSON: function () {
        var commentsJSON = this.get('comments').toJSON();
        var ret = {
            id: this.get('id'),
            name: this.get('name'),
            spent: this.get('spent'),
            date: this.get('date'),
            commentsRaw: commentsJSON,
            isGood: this.get('isGood')
        };
        return ret;
    },


    toViewJSON: function () {
        var d = this.get('date');
        var date = new Date(d);
        var firstComment = this.comments().first();
        if (typeof firstComment == "undefined") firstComment = null;
        var goodClass = this.get('isGood') ? 'amt-under' : 'amt-over';
        var ret = {
            spent: this.get('spent'),
            when: date.toRelativeTime(5000),
            firstComment: firstComment != null ? firstComment.toViewJSON() : null,
            goodClass: goodClass
        };
        return ret;
    },

    addComment: function (text, user_id) {
        this.comments().add({ text: text, user_id: user_id, date: new Date().getTime() });
    }

});

var TransactionCollection = Backbone.Collection.extend({
    model: Transaction
});