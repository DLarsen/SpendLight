//The Venue class handles the data structure for venues

var Comment = Backbone.Model.extend({
    defaults: {
        id: null,
        user_id: null,
        user_name: null,
        user_avatar: null,
        text: "",
        date: new Date().getTime()
    },



    toJSON: function () {
        var ret = {
            id: this.get('id'),
            user_id: this.get('user_id'),
            text: this.get('text'),
            date: this.get('date')
        };
        return ret;
    },

    toViewJSON: function () {
        var d = this.get('date');
        var date = new Date(d);
        var ret = {
            user_id: this.get('user_id'),
            text: this.get('text'),
            when: date.toRelativeTime(5000)
        };
        return ret;
    }

});

var CommentCollection = Backbone.Collection.extend({
    model: Comment
});