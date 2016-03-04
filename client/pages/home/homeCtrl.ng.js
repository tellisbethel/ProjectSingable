angular.module('Singable').controller('HomeCtrl', function ($scope) {
  $scope.keys = {};
  $scope.perfectKey = "";
  $scope.selectedSong;
  $scope.manualInput = false;
  $scope.songs = [];

  $scope.refreshSongs = function(search) {
    console.log('searching');
    Meteor.call('search', search, function(error, data) {
      console.log(data);
      $scope.songs = data;
    });
  };

  $scope.selectSong = function(song) {
    $scope.perfectKey = "";
    $scope.selectedSong = song;
  };

  $scope.disableGettingKey = function() {
    if (!$scope.manualInput) {
      return $scope.selectedSong ? false : true;
    } else {
      if ($scope.keys.lowNote && $scope.keys.lowNote.length > 0 &&
          $scope.keys.highNote && $scope.keys.highNote.length > 0 &&
          $scope.keys.songNote && $scope.keys.songNote.length > 0 &&
          $scope.keys.songName && $scope.keys.songName.length > 0 &&
          $scope.keys.songArtist && $scope.keys.songArtist.length > 0) {
        return false;
      } else {
        return true;
      }
    }
  };

  $scope.displayPerfectNote = function() {
    if (!$scope.manualInput) {
      // By Song
      Meteor.call('songById', $scope.selectedSong._id, function(error, data) {
        $scope.perfectKey = data.optimalNote;
        $scope.$digest();
      });
    } else {
      // Manual Input
      Meteor.call('getOptimalKey', $scope.keys.lowNote, $scope.keys.highNote,
          $scope.keys.songNote, function(error, data) {
            $scope.perfectKey = data;
            $scope.$digest();
            var name = $scope.keys.songName + ' (' + $scope.keys.songArtist +
                ')';
            if (data.length > 0 && $scope.keys.songName.length > 0) {
              Meteor.call('create', name, data);
            }
          });
    }
  };
});
