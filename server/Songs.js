Meteor.methods({
  search: function(query, options) {
    options = options || {};

    if (options.limit) {
      options.limit = Math.min(50, Math.abs(options.limit));
    } else {
      options.limit = 50;
    }
    options.fields = {optimalNote: 0};

    var regex = new RegExp("^" + query, 'i');
    return Songs.find({name: {$regex:  regex}}, options).fetch();
  },
  songById: function(id) {
    return Songs.find({_id: id}).fetch()[0];
  },
  create: function(songName, optimalNote) {
    if (Songs.find({name: songName}).fetch().length === 0) {
      Songs.insert({name: songName, optimalNote: optimalNote});
    }
  }
});
