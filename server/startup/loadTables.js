Meteor.startup(function () {
  // code to run on server at startup
  noteDistanceTable = JSON.parse(Assets.getText('data/notedistancetable.json'))[0];
  noteFrequencyTable = JSON.parse(Assets.getText('data/notefrequencytable.json'))[0];
});
