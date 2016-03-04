Meteor.startup(function() {
  Songs = new Mongo.Collection("songs");
  if (Songs.find().count() === 0) {
    var data = Papa.parse(Assets.getText('SingableDatabaseCSV.csv')).data;
    console.log(data);
    for (var i = 1; i < data.length; i++) {
      if (data[i][1]) {
        Songs.insert({name: data[i][0], optimalNote: data[i][1]});
      }
    }
  }
});
