if (Meteor.isServer) {
  var getKeyByVal = function(val) {
    var matchKey = '';
    Object.keys(noteFrequencyTable).forEach(function(key) {
      if (Math.ceil(noteFrequencyTable[key]) === val) {
        matchKey = key.replace(/[0-9]/g, '');
      }
    });
    return matchKey;
  };

  var getOptimalKey = function(lowerKey, upperKey, songKey) {
    var mid = parseInt(lowerKey) + Math.ceil((upperKey - lowerKey) / 2);
    var midLet = getKeyByVal(mid).replace(/[0-9]/g, '');;
    var dist = noteDistanceTable[midLet];

    var hasM = songKey.split(/m/i);
    songKey = hasM[0];

    var songKeyNum = noteFrequencyTable[songKey+"3"];
    var noteNum = parseInt(dist) + parseInt(songKeyNum);

    if (hasM.length > 1) {
      var key = getKeyByVal(noteNum)
      return key+'m';
    }
    return getKeyByVal(noteNum);
  };

  Meteor.methods({
    getOptimalKey: function(lowerKey, upperKey, songKey) {
      check(lowerKey, String);
      check(upperKey, String);
      check(songKey, String);
      if (!lowerKey || !upperKey || !songKey) {
        return;
      }
      var lowerKeyNum = noteFrequencyTable[lowerKey];
      var upperKeyNum = noteFrequencyTable[upperKey];
      var middleKey = "";
      if (lowerKeyNum && upperKeyNum) {
        middleKey = getOptimalKey(lowerKeyNum, upperKeyNum, songKey);
      }
      return middleKey;
    }
  });
}
