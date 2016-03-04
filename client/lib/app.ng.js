var app = angular.module('Singable',['angular-meteor', 'ui.router','ui.select',
'ngSanitize']).run(function($rootScope, $state) {
  $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
    // We can catch the error thrown when the $requireUser promise is rejected
    // and redirect the user back to the main page
    if (error === 'AUTH_REQUIRED') {
      $state.go('parties');
    }
  });
});
